require('dotenv').config()
// let mysql = require('mysql')
let mysql = require('mysql2')
let connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_NAME,
})
let tablePrefix = process.env.DB_TABLE_PREFIX

function dbQuery(sql) {

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting: ' + err.stack)
            return
        }
    })
    let dbResult = connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message)
        }
        if (results) {
            return results
        }
        // console.log(results)
        // return results
    })
    console.log(dbResult)
    connection.end()
    return dbResult

}

let parameter = '451'
let sql = `Select * From ${tablePrefix}wc_order_stats where order_id=` + `'${parameter}'`

let results = dbQuery(sql)
// console.log(results)
