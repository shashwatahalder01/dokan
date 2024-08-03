import { expect } from '@playwright/test';
import { MySqlConnection, DbContext } from 'mysqlconnector';
import { serialize, unserialize } from 'php-serialize';
import { dbData } from '@utils/dbData';
import { helpers } from '@utils/helpers';
import { commission, feeRecipient } from '@utils/interfaces';
const { DB_HOST_NAME, DB_USER_NAME, DB_USER_PASSWORD, DATABASE, DB_PORT, DB_PREFIX } = process.env;

const mySql = new MySqlConnection({
    hostname: DB_HOST_NAME,
    username: DB_USER_NAME,
    password: DB_USER_PASSWORD,
    db: DATABASE,
    port: Number(DB_PORT),
});

const dbPrefix = DB_PREFIX;

export const dbUtils = {
    // execute db query
    async dbQuery(query: string): Promise<any> {
        const dbContext: DbContext = new DbContext(mySql);
        return await dbContext.inTransactionAsync(async dbContext => {
            try {
                const result = await dbContext.executeAsync(query);
                const res = JSON.parse(JSON.stringify(result));
                expect(res).not.toHaveProperty('errno');
                return res;
            } catch (err: unknown) {
                // console.log('dbError:', err);
                return err;
            }
        });
    },

    // get max id
    async getMaxId(columnName: string, tableName: string): Promise<any> {
        const querySelect = `SELECT MAX(${columnName}) as id FROM ${dbPrefix}_${tableName};`;
        const res = await dbUtils.dbQuery(querySelect);
        // console.log(res);
        const id = res[0].id;
        return id;
    },

    // update option table
    async updateWpOptionTable(optionName: string, optionValue: object | string, serializeData?: string): Promise<any> {
        optionValue = serializeData ? serialize(optionValue) : optionValue;
        const queryUpdate = `UPDATE ${dbPrefix}_options SET option_value = '${optionValue}' WHERE option_name = '${optionName}';`;
        const res = await dbUtils.dbQuery(queryUpdate);
        // console.log(res);
        return res;
    },

    // get user meta
    async getUserMeta(userId: string, metaKey: string): Promise<any> {
        const querySelect = `Select meta_value FROM ${dbPrefix}_usermeta WHERE user_id = '${userId}' AND meta_key = '${metaKey}';`;
        const res = await dbUtils.dbQuery(querySelect);
        const userMeta = unserialize(res[0].meta_value, {
            WP_Term: function () {
                return {};
            },
        }); //todo: added to handle WP_Term error, test if it works for further cases
        // console.log(userMeta);
        return userMeta;
    },

    // create user meta
    async setUserMeta(userId: string, metaKey: string, metaValue: object | string, serializeData?: boolean): Promise<any> {
        metaValue = serializeData ? serialize(metaValue) : metaValue;
        const metaExists = await dbUtils.dbQuery(`SELECT EXISTS (SELECT 1 FROM ${dbPrefix}_usermeta WHERE user_id = '${userId}' AND meta_key = '${metaKey}') AS row_exists;`);
        const queryUpdate = metaExists[0].row_exists
            ? `UPDATE ${dbPrefix}_usermeta SET meta_value = '${metaValue}'  WHERE user_id = '${userId}' AND meta_key = '${metaKey}';`
            : `INSERT INTO ${dbPrefix}_usermeta VALUES ( NULL, '${userId}', '${metaKey}', '${metaValue}');`;
        const res = await dbUtils.dbQuery(queryUpdate);
        // console.log(res);
        return res;
    },

    // update dokan settings
    async updateUserMeta(userId: string, metaKey: string, updatedMetaValue: object): Promise<[object, object]> {
        const currentMetaValue = await this.getUserMeta(userId, metaKey);
        const newMetaValue = helpers.deepMergeObjects(currentMetaValue, updatedMetaValue); //todo: update method when updatedMetaValue is string
        // console.log('newSettings:', newMetaValue);
        await this.setUserMeta(userId, metaKey, newMetaValue, true);
        return [currentMetaValue, newMetaValue];
    },

    // get dokan settings
    async getDokanSettings(optionName: string): Promise<any> {
        const querySelect = `Select option_value FROM ${dbPrefix}_options WHERE option_name = '${optionName}';`;
        const res = await dbUtils.dbQuery(querySelect);
        // console.log(res[0].option_value);
        // console.log(unserialize(res[0].option_value));
        return unserialize(res[0].option_value);
    },

    // set dokan settings
    async setDokanSettings(optionName: string, optionValue: object | string): Promise<any> {
        optionValue = typeof optionValue == 'object' ? serialize(optionValue) : optionValue;
        const queryInsert = `INSERT INTO ${dbPrefix}_options VALUES ( NULL, '${optionName}', '${optionValue}', 'yes');`;
        let res = await dbUtils.dbQuery(queryInsert);
        if (res.code === 'ER_DUP_ENTRY') {
            const queryUpdate = `UPDATE ${dbPrefix}_options SET option_value = '${optionValue}' WHERE option_name = '${optionName}';`;
            res = await dbUtils.dbQuery(queryUpdate);
        }
        // console.log(res);
        return res;
    },

    // update dokan settings
    async updateDokanSettings(optionName: string, updatedSettings: object): Promise<[object, object]> {
        const currentSettings = await this.getDokanSettings(optionName);
        const newSettings = helpers.deepMergeObjects(currentSettings, updatedSettings);
        // console.log('newSettings:', newSettings);
        await this.setDokanSettings(optionName, newSettings);
        return [currentSettings, newSettings];
    },

    // get selling info
    async getSellingInfo(): Promise<[commission, feeRecipient]> {
        const res = await this.getDokanSettings(dbData.dokan.optionName.selling);
        const commission = {
            type: res.commission_type,
            amount: res.admin_percentage,
            additionalAmount: res.additional_fee,
        };
        const feeRecipient = {
            shippingFeeRecipient: res.shipping_fee_recipient,
            taxFeeRecipient: res.tax_fee_recipient,
            shippingTaxFeeRecipient: res.shipping_tax_fee_recipient,
        };
        return [commission, feeRecipient];
    },

    // create abuse report
    async createAbuseReport(abuseReport: any, productId: string, vendorId: string, customerId: string): Promise<any> {
        const querySelect = `INSERT INTO ${dbPrefix}_dokan_report_abuse_reports (reason, product_id, vendor_id, customer_id, description, reported_at) VALUES ('${abuseReport.reason}', ${parseInt(productId)}, ${parseInt(
            vendorId,
        )}, ${parseInt(customerId)}, '${abuseReport.description}',  '${helpers.currentDateTimeFullFormat}');`;
        const res = await dbUtils.dbQuery(querySelect);
        // console.log(res);
        return res;
    },

    // create refund
    async createRefundRequest(responseBody: any): Promise<[any, string]> {
        const refundId = (await this.getMaxId('id', 'dokan_refund')) + 1;

        const refund = {
            id: refundId,
            orderId: responseBody.id,
            sellerId: responseBody.stores[0].id,
            refundAmount: 20.5,
            refundReason: 'test refund',
            itemQtys: `{"${responseBody.line_items[0].id}": 1 }`,
            itemTotals: `{"${responseBody.line_items[0].id}":"10.000000","${responseBody.shipping_lines[0].id}":"5.000000"}`,
            itemTaxTotals: `{"${responseBody.line_items[0].id}":{"${responseBody.line_items[0].taxes[0].id}":5},"${responseBody.shipping_lines[0].id}":{"${responseBody.line_items[0].taxes[0].id}":0.5}}`,
            restockItems: 1,
            date: helpers.currentDateTimeFullFormat,
            status: 0, // 0 for pending, 1 for completed
            method: 0,
        };
        // console.log('refund data:', refund);
        const queryInsert = `INSERT INTO ${dbPrefix}_dokan_refund VALUES ( '${refund.id}', '${refund.orderId}', '${refund.sellerId}', ${refund.refundAmount}, 
        '${refund.refundReason}', '${refund.itemQtys}', '${refund.itemTotals}', '${refund.itemTaxTotals}', '${refund.restockItems}', '${refund.date}', 
        '${refund.status}', '${refund.method}' );`;
        const res = await dbUtils.dbQuery(queryInsert);
        // console.log(res);
        return [res, refundId];
    },

    // update cell
    async updateCell(id: any, value: any): Promise<any> {
        const queryUpdate = `UPDATE ${dbPrefix}_posts SET post_author = '${value}' WHERE ID = '${id}';`;
        const res = await dbUtils.dbQuery(queryUpdate);
        // console.log(res);
        return res;
    },

    // create booking resource
    async createBookingResource(postId: string, url: string): Promise<any> {
        const guid = url + '?post_type=bookable_resource&#038;p=' + postId;
        const queryUpdate = `UPDATE ${dbPrefix}_posts SET guid = '${guid}', post_type = 'bookable_resource' WHERE ID = '${postId}';`;
        const res = await dbUtils.dbQuery(queryUpdate);
        // console.log(res);
        return res;
    },
};
