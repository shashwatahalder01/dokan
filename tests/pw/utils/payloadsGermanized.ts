// germanized
const germanized0 = {
    update: [
        {
            id: 'woocommerce_terms_page_id',
            label: 'Terms & Conditions',
            description: '',
            default: '',
            value: '387',
        },
        {
            id: 'woocommerce_revocation_page_id',
            label: 'Cancellation Policy',
            description: '',
            default: '',
            tip: "This page should contain information regarding your customer's Right of Withdrawal.",
            value: '388',
        },
        {
            id: 'woocommerce_gzd_revocation_address',
            label: 'Send withdrawal to',
            description: 'Type in an address, telephone/telefax number, email address which is to be used as the recipient address of the withdrawal.',
            default: 'dokan3\nabc street\nxyz street\nNew York, 10006',
            value: 'dokan3\nabc street\nxyz street\nNew York, 10006',
        },
        {
            id: 'woocommerce_imprint_page_id',
            label: 'Imprint',
            description: "This page should contain an imprint with your company's information.",
            default: '',
            tip: "This page should contain an imprint with your company's information.",
            value: '385',
        },
        {
            id: 'woocommerce_data_security_page_id',
            label: 'Privacy Policy',
            description: '<div class="wc-gzd-additional-desc">Please make sure to place your privacy policy to be directly accessible to the user on the website, e.g. as a link within your footer.</div>',
            default: '',
            value: '3',
        },
        {
            id: 'woocommerce_payment_methods_page_id',
            label: 'Payment Methods',
            description: 'This page should contain information regarding the Payment Methods that are chooseable during checkout.',
            default: '',
            value: '390',
        },
        {
            id: 'woocommerce_shipping_costs_page_id',
            label: 'Shipping Methods',
            description: 'This page should contain information regarding shipping methods that are chooseable during checkout.',
            default: '',
            value: '389',
        },
        {
            id: 'woocommerce_review_authenticity_page_id',
            label: 'Review Authenticity',
            description: 'This page should contain information about the authenticity of customer reviews.',
            default: '',
            value: '392',
        },
        {
            id: 'woocommerce_gzd_dispute_resolution_type',
            label: 'Dispute Resolution',
            description:
                'You may select whether you are willing, obliged or not willing to participate in dispute settlement proceedings before a consumer arbitration board. The corresponding Resolution Text is attached to the [gzd_complaints] shortcode which you should add to your imprint. Trusted Shops advises you to add that text to your Terms & Conditions as well.',
            default: 'none',
            value: 'none',
        },
        {
            id: 'woocommerce_gzd_alternative_complaints_text_none',
            label: 'Resolution Text',
            description: 'Adapt this example text regarding alternative dispute resolution to your needs. Text will be added to the [gzd_complaints] Shortcode. You may as well add this text to your terms & conditions.',
            default:
                'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. We are not obliged nor willing to participate in dispute settlement proceedings before a consumer arbitration board.',
            value: 'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. We are not obliged nor willing to participate in dispute settlement proceedings before a consumer arbitration board.',
        },
        {
            id: 'woocommerce_gzd_alternative_complaints_text_willing',
            label: 'Resolution Text',
            description: 'Adapt this example text regarding alternative dispute resolution to your needs. Text will be added to the [gzd_complaints] Shortcode. You may as well add this text to your terms & conditions.',
            default:
                'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. Consumers may use this platform for the settlements of their disputes. We are in principle prepared to participate in an extrajudicial arbitration proceeding.',
            value: 'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. Consumers may use this platform for the settlements of their disputes. We are in principle prepared to participate in an extrajudicial arbitration proceeding.',
        },
        {
            id: 'woocommerce_gzd_alternative_complaints_text_obliged',
            label: 'Resolution Text',
            description: 'Adapt this example text regarding alternative dispute resolution to your needs. Text will be added to the [gzd_complaints] Shortcode. You may as well add this text to your terms & conditions.',
            default:
                'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. Consumers may contact [Name, Address, Website of arbitration board] for the settlements of their disputes. We are obliged to participate in arbitration proceeding before that board.',

            value: 'The european commission provides a platform for online dispute resolution (OS) which is accessible at https://ec.europa.eu/consumers/odr. Consumers may contact [Name, Address, Website of arbitration board] for the settlements of their disputes. We are obliged to participate in arbitration proceeding before that board.',
        },
        {
            id: 'woocommerce_gzd_small_enterprise_text',
            label: 'Notice Text',
            description: 'You may want to adjust the small business notice text to meet your criteria.',

            default: 'Value added tax is not collected, as small businesses according to §19 (1) UStG.',

            value: 'Value added tax is not collected, as small businesses according to §19 (1) UStG.',
        },
        {
            id: 'woocommerce_gzd_checkout_validate_street_number',
            label: 'Validate street number',
            description: 'Force the existence of a street number within the first address field.',

            default: 'never',
            value: 'never',
        },
        {
            id: 'woocommerce_gzd_display_checkout_free_shipping_excluded',
            label: 'Exclude Methods',
            description: '<div class="wc-gzd-additional-desc">Optionally choose methods which should be excluded from hiding when free shipping is available (e.g. express shipping options).</div>',

            default: [],
            value: [],
        },
        {
            id: 'woocommerce_gzd_display_listings_link_details_text',
            label: 'Product Details Text',
            description: '',

            default: 'Details',

            value: 'Details',
        },
        {
            id: 'woocommerce_gzd_product_rating_verified_text',
            label: 'Format',
            description:
                '<div class="wc-gzd-additional-desc">Customize the format used to notify customers about the authenticity of the ratings. Use {link}{/link} as placeholders to link your <a href="http://dokan3.test/wp-admin/admin.php?page=wc-settings&tab=germanized-general">review information page</a>.</div>',

            default: '{link}Verified overall ratings{/link}',
            value: '{link}Verified overall ratings{/link}',
        },
        {
            id: 'woocommerce_gzd_product_rating_unverified_text',
            label: 'Format',
            description:
                '<div class="wc-gzd-additional-desc">Customize the format used to notify customers about the authenticity of the ratings. Use {link}{/link} as placeholders to link your <a href="http://dokan3.test/wp-admin/admin.php?page=wc-settings&tab=germanized-general">review information page</a>.</div>',

            default: '{link}Unverified overall ratings{/link}',
            value: '{link}Unverified overall ratings{/link}',
        },
        {
            id: 'woocommerce_gzd_product_review_verified_text',
            label: 'Verified Format',
            description:
                '<div class="wc-gzd-additional-desc">Customize the format used to notify customers about the authenticity of the review. Use {link}{/link} as placeholders to link your <a href="http://dokan3.test/wp-admin/admin.php?page=wc-settings&tab=germanized-general">review information page</a>.</div>',

            default: 'Verified purchase. {link}Find out more{/link}',
            value: 'Verified purchase. {link}Find out more{/link}',
        },
        {
            id: 'woocommerce_gzd_product_review_unverified_text',
            label: 'Unverified Format',
            description:
                '<div class="wc-gzd-additional-desc">Customize the format used to notify customers about the authenticity of the review. Use {link}{/link} as placeholders to link your <a href="http://dokan3.test/wp-admin/admin.php?page=wc-settings&tab=germanized-general">review information page</a>.</div>',

            default: 'Purchase not verified. {link}Find out more{/link}',
            value: 'Purchase not verified. {link}Find out more{/link}',
        },
        {
            id: 'woocommerce_gzd_price_range_format_text',
            label: 'Price Range Format',
            description: '<div class="wc-gzd-additional-desc">Adjust the price range format e.g. for variable products. Use {min_price} as placeholder for the minimum price. Use {max_price} as placeholder for the maximum price.</div>',

            default: '{min_price} &ndash; {max_price}',
            value: '{min_price} &ndash; {max_price}',
        },
        {
            id: 'woocommerce_gzd_shipping_costs_text',
            label: 'Notice Text',
            description: '<div class="wc-gzd-additional-desc">This text will be used to inform the customer about shipping costs. Use {link}{/link} to insert link to shipping costs page.</div>',

            default: 'plus {link}Shipping Costs{/link}',
            value: 'plus {link}Shipping Costs{/link}',
        },
        {
            id: 'woocommerce_gzd_free_shipping_text',
            label: 'Free Shipping Text',
            description: '<div class="wc-gzd-additional-desc">This text will be used to inform the customer about free shipping. Leave empty to disable notice. Use {link}{/link} to insert link to shipping costs page.</div>',

            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_display_shipping_costs_hidden_types',
            label: 'Hide Notice',
            description: 'Select product types for which you might want to disable the shipping costs notice.',

            default: ['downloadable', 'external', 'virtual'],

            value: ['downloadable', 'external', 'virtual'],
        },
        {
            id: 'woocommerce_gzd_default_delivery_time',
            label: 'Fallback',
            description: '<a href="http://dokan3.test/wp-admin/edit-tags.php?taxonomy=product_delivery_time&#038;post_type=product">Manage Delivery Times</a>',

            default: '',

            value: '',
        },
        {
            id: 'woocommerce_gzd_default_delivery_time_eu',
            label: 'Fallback EU Countries',
            description: '<a href="http://dokan3.test/wp-admin/edit-tags.php?taxonomy=product_delivery_time&#038;post_type=product">Manage Delivery Times</a>',

            default: '',

            value: '',
        },
        {
            id: 'woocommerce_gzd_default_delivery_time_third_countries',
            label: 'Fallback Third Countries',
            description: '<a href="http://dokan3.test/wp-admin/edit-tags.php?taxonomy=product_delivery_time&#038;post_type=product">Manage Delivery Times</a>',

            default: '',

            value: '',
        },
        {
            id: 'woocommerce_gzd_delivery_time_text',
            label: 'Format',
            description: '<div class="wc-gzd-additional-desc"> This text will be used to indicate delivery time for products. Use {delivery_time} as placeholder. Use {stock_status} to output the current stock status.</div>',

            default: 'Delivery time: {delivery_time}',
            value: 'Delivery time: {delivery_time}',
        },
        {
            id: 'woocommerce_gzd_display_digital_delivery_time_text',
            label: 'Digital text',
            description: '',

            default: '',

            value: '',
        },
        {
            id: 'woocommerce_gzd_display_delivery_time_hidden_types',
            label: 'Hide Notice',
            description: 'Select product types for which you might want to disable the delivery time notice.',

            default: ['external', 'virtual'],

            value: ['external', 'virtual'],
        },
        {
            id: 'woocommerce_gzd_unit_price_text',
            label: 'Format',
            description:
                '<div class="wc-gzd-additional-desc">This text will be used to display the unit price. Use {price} to insert the price. If you want to specifically format unit price output use {base}, {unit} and {unit_price} as placeholders.</div>',

            default: '{price}',
            value: '{price}',
        },
        {
            id: 'woocommerce_gzd_product_units_text',
            label: 'Product units format',
            description:
                '<div class="wc-gzd-additional-desc">This text will be used to display the product units. Use {product_units} to insert the amount of product units. Use {unit} to insert the unit. Optionally display the formatted unit price with {unit_price}.</div>',

            default: 'Product contains: {product_units} {unit}',
            value: 'Product contains: {product_units} {unit}',
        },
        {
            id: 'woocommerce_gzd_default_sale_price_label',
            label: 'Fallback Strike Price Label',
            description:
                '<a href="http://dokan3.test/wp-admin/edit-tags.php?taxonomy=product_price_label&#038;post_type=product">Manage Price Labels</a><div class="wc-gzd-additional-desc">Choose whether you would like to have a default strike price label to inform the customer about the regular price (e.g. Recommended Retail Price).</div>',

            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_default_sale_price_regular_label',
            label: 'Fallback Sale Price Label',
            description:
                '<a href="http://dokan3.test/wp-admin/edit-tags.php?taxonomy=product_price_label&#038;post_type=product">Manage Price Labels</a><div class="wc-gzd-additional-desc">Choose whether you would like to have a default sale price label to inform the customer about the sale price (e.g. New Price).</div>',

            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_display_single_product_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',

            default: 11,

            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_single_product_legal_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_legal_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',

            default: 12,

            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_single_product_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 27.',

            default: 27,

            value: '27',
        },
        {
            id: 'woocommerce_gzd_display_single_product_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_product_meta_start',

            value: 'woocommerce_product_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_single_product_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5.',

            default: 5,

            value: '5',
        },
        {
            id: 'woocommerce_gzd_display_single_product_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 21.',

            default: 21,

            value: '21',
        },
        {
            id: 'woocommerce_gzd_display_single_product_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 13.',

            default: 13,

            value: '13',
        },
        {
            id: 'woocommerce_gzd_display_single_product_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',

            default: 10,

            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_single_product_nutri_score_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_single_product_summary',

            value: 'woocommerce_single_product_summary',
        },
        {
            id: 'woocommerce_gzd_display_single_product_nutri_score_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 15.',

            default: 15,

            value: '15',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',

            default: 11,

            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_legal_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_legal_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',

            default: 12,

            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 15.',

            default: 15,

            value: '15',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 20.',

            default: 20,

            value: '20',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_label',

            value: 'woocommerce_grouped_product_list_column_label',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',

            default: 11,

            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 13.',

            default: 13,

            value: '13',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_grouped_product_list_column_price',

            value: 'woocommerce_grouped_product_list_column_price',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',

            default: 10,

            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_nutri_score_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_grouped_product_list_column_label',
            value: 'woocommerce_grouped_product_list_column_label',
        },
        {
            id: 'woocommerce_gzd_display_single_product_grouped_nutri_score_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 20.',
            default: 20,
            value: '20',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item_title',
            value: 'woocommerce_after_shop_loop_item_title',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',
            default: 11,
            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_tax_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item',
            value: 'woocommerce_after_shop_loop_item',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_tax_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 6.',
            default: 6,
            value: '6',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_shipping_costs_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item',
            value: 'woocommerce_after_shop_loop_item',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_shipping_costs_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 7.',
            default: 7,
            value: '7',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item',
            value: 'woocommerce_after_shop_loop_item',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 8.',
            default: 8,
            value: '8',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item',
            value: 'woocommerce_after_shop_loop_item',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 9.',
            default: 9,
            value: '9',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item_title',
            value: 'woocommerce_after_shop_loop_item_title',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',
            default: 12,
            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item_title',
            value: 'woocommerce_after_shop_loop_item_title',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',
            default: 10,
            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_nutri_score_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_shop_loop_item',
            value: 'woocommerce_after_shop_loop_item',
        },
        {
            id: 'woocommerce_gzd_display_product_loop_nutri_score_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 15.',
            default: 15,
            value: '15',
        },
        {
            id: 'woocommerce_gzd_display_product_block_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5.',
            default: 5,
            value: '5',
        },
        {
            id: 'woocommerce_gzd_display_product_block_tax_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_tax_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',

            default: 10,

            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_product_block_shipping_costs_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_shipping_costs_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',
            default: 11,
            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_product_block_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',
            default: 12,
            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_product_block_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 15.',
            default: 15,
            value: '15',
        },
        {
            id: 'woocommerce_gzd_display_product_block_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 6.',
            default: 6,
            value: '6',
        },
        {
            id: 'woocommerce_gzd_display_product_block_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_title',
            value: 'woocommerce_gzd_after_product_grid_block_after_title',
        },
        {
            id: 'woocommerce_gzd_display_product_block_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',
            default: 10,
            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_product_block_nutri_score_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_gzd_after_product_grid_block_after_price',
            value: 'woocommerce_gzd_after_product_grid_block_after_price',
        },
        {
            id: 'woocommerce_gzd_display_product_block_nutri_score_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 20.',
            default: 20,
            value: '20',
        },
        {
            id: 'woocommerce_gzd_display_cart_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_cart_item_price',
            value: 'woocommerce_cart_item_price',
        },
        {
            id: 'woocommerce_gzd_display_cart_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5000.',
            default: 5000,
            value: '5000',
        },
        {
            id: 'woocommerce_gzd_display_cart_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_cart_item_name',
            value: 'woocommerce_after_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_cart_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 1.',
            default: 1,
            value: '1',
        },
        {
            id: 'woocommerce_gzd_display_cart_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_after_cart_item_name',
            value: 'woocommerce_after_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_cart_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 2.',

            default: 2,

            value: '2',
        },
        {
            id: 'woocommerce_gzd_display_cart_item_desc_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_after_cart_item_name',

            value: 'woocommerce_after_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_cart_item_desc_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 3.',

            default: 3,

            value: '3',
        },
        {
            id: 'woocommerce_gzd_display_cart_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_after_cart_item_name',

            value: 'woocommerce_after_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_cart_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 4.',

            default: 4,

            value: '4',
        },
        {
            id: 'woocommerce_gzd_display_cart_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_subtotal',

            value: 'woocommerce_cart_item_subtotal',
        },
        {
            id: 'woocommerce_gzd_display_cart_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5000.',

            default: 5000,

            value: '5000',
        },
        {
            id: 'woocommerce_gzd_display_cart_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_after_cart_item_name',

            value: 'woocommerce_after_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_cart_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5.',

            default: 5,

            value: '5',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_price',

            value: 'woocommerce_cart_item_price',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5000.',

            default: 5000,

            value: '5000',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_name',

            value: 'woocommerce_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',

            default: 10,

            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_name',

            value: 'woocommerce_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',

            default: 11,

            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_item_desc_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_name',

            value: 'woocommerce_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_item_desc_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',

            default: 12,

            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_name',

            value: 'woocommerce_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 13.',

            default: 13,

            value: '13',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_price',

            value: 'woocommerce_cart_item_price',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5000.',

            default: 5000,

            value: '5000',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_name',

            value: 'woocommerce_cart_item_name',
        },
        {
            id: 'woocommerce_gzd_display_mini_cart_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 9.',

            default: 9,

            value: '9',
        },
        {
            id: 'woocommerce_gzd_display_checkout_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_cart_item_subtotal',

            value: 'woocommerce_cart_item_subtotal',
        },
        {
            id: 'woocommerce_gzd_display_checkout_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 0.',

            default: 0,

            value: '0',
        },
        {
            id: 'woocommerce_gzd_display_checkout_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_checkout_cart_item_quantity',

            value: 'woocommerce_checkout_cart_item_quantity',
        },
        {
            id: 'woocommerce_gzd_display_checkout_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',

            default: 10,

            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_checkout_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_checkout_cart_item_quantity',

            value: 'woocommerce_checkout_cart_item_quantity',
        },
        {
            id: 'woocommerce_gzd_display_checkout_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 11.',

            default: 11,

            value: '11',
        },
        {
            id: 'woocommerce_gzd_display_checkout_item_desc_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',

            default: 'woocommerce_checkout_cart_item_quantity',

            value: 'woocommerce_checkout_cart_item_quantity',
        },
        {
            id: 'woocommerce_gzd_display_checkout_item_desc_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 12.',
            default: 12,
            value: '12',
        },
        {
            id: 'woocommerce_gzd_display_checkout_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_checkout_cart_item_quantity',
            value: 'woocommerce_checkout_cart_item_quantity',
        },
        {
            id: 'woocommerce_gzd_display_checkout_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 13.',
            default: 13,
            value: '13',
        },
        {
            id: 'woocommerce_gzd_display_checkout_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_cart_item_subtotal',
            value: 'woocommerce_cart_item_subtotal',
        },
        {
            id: 'woocommerce_gzd_display_checkout_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5.',
            default: 5,
            value: '5',
        },
        {
            id: 'woocommerce_gzd_display_checkout_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_checkout_cart_item_quantity',
            value: 'woocommerce_checkout_cart_item_quantity',
        },
        {
            id: 'woocommerce_gzd_display_checkout_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 9.',
            default: 9,
            value: '9',
        },
        {
            id: 'woocommerce_gzd_display_order_unit_price_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_formatted_line_subtotal',
            value: 'woocommerce_order_formatted_line_subtotal',
        },
        {
            id: 'woocommerce_gzd_display_order_unit_price_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 0.',
            default: 0,
            value: '0',
        },
        {
            id: 'woocommerce_gzd_display_order_delivery_time_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_item_meta_start',
            value: 'woocommerce_order_item_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_order_delivery_time_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 20.',
            default: 20,
            value: '20',
        },
        {
            id: 'woocommerce_gzd_display_order_units_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_item_meta_start',
            value: 'woocommerce_order_item_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_order_units_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 25.',
            default: 25,
            value: '25',
        },
        {
            id: 'woocommerce_gzd_display_order_item_desc_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_item_meta_start',
            value: 'woocommerce_order_item_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_order_item_desc_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 10.',
            default: 10,
            value: '10',
        },
        {
            id: 'woocommerce_gzd_display_order_defect_description_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_item_meta_start',
            value: 'woocommerce_order_item_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_order_defect_description_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 15.',
            default: 15,
            value: '15',
        },
        {
            id: 'woocommerce_gzd_display_order_deposit_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_formatted_line_subtotal',
            value: 'woocommerce_order_formatted_line_subtotal',
        },
        {
            id: 'woocommerce_gzd_display_order_deposit_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 5.',
            default: 5,
            value: '5',
        },
        {
            id: 'woocommerce_gzd_display_order_deposit_packaging_type_filter',
            label: 'Location',
            description: 'Choose a location for the shop-mark. Locations are mapped to specific WooCommerce hooks and may differ from Theme to Theme.',
            default: 'woocommerce_order_item_meta_start',
            value: 'woocommerce_order_item_meta_start',
        },
        {
            id: 'woocommerce_gzd_display_order_deposit_packaging_type_priority',
            label: 'Priority',
            description: 'Choose a priority by which the shop-mark should be attached to the location. The higher the priority, the later the shop-mark will be attached. Defaults to 9.',
            default: 9,
            value: '9',
        },
        {
            id: 'woocommerce_gzd_tax_totals_display',
            label: 'Tax totals',
            description: '',
            default: 'after',
            value: 'after',
        },
        {
            id: 'woocommerce_gzd_tax_mode_additional_costs',
            label: 'Tax calculation mode',
            description: 'Select the tax calculation mode for your additional costs (shipping, fees).',
            default: 'main_service',
            value: 'main_service',
        },
        {
            id: 'woocommerce_gzd_tax_mode_additional_costs_detect_main_service',
            label: 'Detect Main Service by',
            description: 'Choose how to detect the main service.',
            default: 'highest_net_amount',
            value: 'highest_net_amount',
        },
        {
            id: 'woocommerce_gzd_differential_taxation_notice_text',
            label: 'Notice Text',
            description: 'This text will be shown as a further notice for the customer to inform him about differential taxation.',
            default: 'incl. VAT (differential taxation according to §25a UStG.)',
            value: 'incl. VAT (differential taxation according to §25a UStG.)',
        },
        {
            id: 'woocommerce_gzd_order_submit_btn_text',
            label: 'Button Text',
            description: 'This text serves as Button text for the Order Submit Button.',
            default: 'Buy Now',
            value: 'Buy Now',
        },
        {
            id: 'woocommerce_gzd_display_checkout_table_color',
            label: 'Product Table Color',
            description: '',
            default: '#eeeeee',
            value: '#eeeeee',
        },
        {
            id: 'woocommerce_gzd_order_success_text',
            label: 'Order Success Text',
            description: 'Choose a custom text to display on order success page.',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_default_shipping_provider',
            label: 'Default provider',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_auto_statuses',
            label: 'Order statuses',
            description: '',
            default: ['wc-processing', 'wc-on-hold'],
            value: ['wc-processing', 'wc-on-hold'],
        },
        {
            id: 'woocommerce_gzd_shipments_auto_default_status',
            label: 'Default status',
            description: '',
            default: 'gzd-processing',
            value: 'gzd-processing',
        },
        {
            id: 'woocommerce_gzd_shipments_customer_return_open_days',
            label: 'Days to return',
            description:
                '<div class="wc-gzd-additional-desc">In case one of your <a href="http://dokan3.test/wp-admin/admin.php?page=wc-settings&#038;tab=germanized-shipping_provider">shipping providers</a> supports returns added by customers you might want to limit the number of days a customer is allowed to add returns to an order. The days are counted starting with the date the order was shipped, completed or created (by checking for existence in this order).</div>',
            default: '14',
            value: '14',
        },
        {
            id: 'woocommerce_gzd_shipments_default_packaging',
            label: 'Default packaging',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_packing_inner_buffer_type',
            label: 'Buffer type',
            description: '<div class="wc-gzd-additional-desc">Choose a buffer type to leave space between the items and outer dimensions of your packaging.</div>',
            default: 'fixed',
            value: 'fixed',
        },
        {
            id: 'woocommerce_gzd_shipments_packing_inner_fixed_buffer',
            label: 'Fixed Buffer',
            description: 'mm',
            default: '5',
            value: '5',
        },
        {
            id: 'woocommerce_gzd_shipments_packing_inner_percentage_buffer',
            label: 'Percentage Buffer',
            description: '%',
            default: '0.5',
            value: '0.5',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_first_name',
            label: 'First Name',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_last_name',
            label: 'Last Name',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_company',
            label: 'Company',
            description: '',
            default: false,
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_address_1',
            label: 'Address 1',
            description: '',
            default: 'abc street',
            value: 'abc street',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_address_2',
            label: 'Address 2',
            description: '',
            default: 'xyz street',
            value: 'xyz street',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_postcode',
            label: 'Postcode',
            description: '',
            default: '10006',
            value: '10006',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_city',
            label: 'City',
            description: '',
            default: 'New York',
            value: 'New York',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_country',
            label: 'Country',
            description: '',
            default: 'US:NY',
            value: 'US:NY',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_phone',
            label: 'Phone',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_email',
            label: 'Email',
            description: '',
            default: 'shashwata@wedevs.com',
            value: 'shashwata@wedevs.com',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_customs_reference_number',
            label: 'Customs Reference Number',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_shipper_address_customs_uk_vat_id',
            label: 'UK VAT ID (HMRC)',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_first_name',
            label: 'First Name',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_last_name',
            label: 'Last Name',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_company',
            label: 'Company',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_address_1',
            label: 'Address 1',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_address_2',
            label: 'Address 2',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_postcode',
            label: 'Postcode',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_city',
            label: 'City',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_country',
            label: 'Country',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_phone',
            label: 'Phone',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_email',
            label: 'Email',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_customs_reference_number',
            label: 'Customs Reference Number',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_shipments_return_address_customs_uk_vat_id',
            label: 'UK VAT ID (HMRC)',
            description: '',
            default: '',
            value: '',
        },
        {
            id: 'woocommerce_gzd_customer_cleanup_interval',
            label: 'Delete inactivated after',
            description: 'days',
            default: 7,
            tip: "This will make sure inactivated customer accounts will be deleted after X days. Set to 0 if you don't want to automatically delete inactivated customers.",
            value: '7',
        },
    ],
};
