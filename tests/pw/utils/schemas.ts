import { z } from 'zod';

const verificationTypeSchema = z.object({
    id: z.string(),
    title: z.string(),
    disabled: z.boolean(),
});

const badgeEventSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    condition_text: z.object({
        prefix: z.string(),
        suffix: z.string(),
        type: z.string(),
    }),
    hover_text: z.string(),
    group: z.object({
        key: z.string(),
        title: z.string(),
        type: z.string().optional(),
    }),
    has_multiple_levels: z.boolean(),
    badge_logo: z.string().url(),
    badge_logo_raw: z.string(),
    input_group_icon: z.object({
        condition: z.string(),
        data: z.string(),
    }),
    status: z.string(),
    created: z.boolean(),
});

const badgeSchema = z.object({
    id: z.number(),
    badge_name: z.string(),
    badge_logo: z.string().url(),
    badge_logo_raw: z.string(),
    default_logo: z.string(),
    formatted_default_logo: z.string().url(),
    event_type: z.string(),
    formatted_hover_text: z.string(),
    event: badgeEventSchema,
    badge_status: z.string(),
    formatted_badge_status: z.string(),
    level_count: z.number(),
    vendor_count: z.number(),
    acquired_level_count: z.number(),
    created_by: z.number(),
    created_at: z.string(),
    levels: z.array(z.any()), // Adjust this based on the actual structure of levels
    _links: z.object({
        self: z.array(
            z.object({
                href: z.string().url(),
            }),
        ),
        collection: z.array(
            z.object({
                href: z.string().url(),
            }),
        ),
    }),
});

const badgeCreateUpdateSchema = z.object({
    id: z.number(),
    action: z.enum(['insert', 'update']),
});

// store settings
const socialSchema = z
    .object({
        fb: z.string().url().or(z.string().nullish()),
        youtube: z.string().url().or(z.string().nullish()),
        twitter: z.string().url().or(z.string().nullish()),
        linkedin: z.string().url().or(z.string().nullish()),
        pinterest: z.string().url().or(z.string().nullish()),
        instagram: z.string().url().or(z.string().nullish()),
        flickr: z.string().url().or(z.string().nullish()),
    })
    .or(z.array(z.any()));

const paypalSchema = z.object({
    email: z.string().email().or(z.string().nullish()),
});

const bankSchema = z.object({
    ac_name: z.string(),
    ac_type: z.string(),
    ac_number: z.string(),
    bank_name: z.string(),
    bank_addr: z.string(),
    routing_number: z.string(),
    iban: z.string(),
    swift: z.string(),
});

const skrillSchema = z.object({
    email: z.string().email(),
});

const paymentSchema = z.object({
    paypal: paypalSchema.optional(),
    bank: bankSchema.optional(),
    stripe: z.boolean().optional(),
    skrill: skrillSchema.optional(),
});

const addressSchema = z
    .object({
        street_1: z.string(),
        street_2: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
        state: z.string(),
    })
    .or(z.array(z.any()));

const timeSchema = z.object({
    status: z.string(),
    opening_time: z.array(z.string()),
    closing_time: z.array(z.string()),
});

const storeTimeSchema = z.object({
    monday: timeSchema,
    tuesday: timeSchema,
    wednesday: timeSchema,
    thursday: timeSchema,
    friday: timeSchema,
    saturday: timeSchema,
    sunday: timeSchema,
});

const catalogModeSchema = z.object({
    hide_add_to_cart_button: z.string(),
    hide_product_price: z.string(),
    request_a_quote_enabled: z.string(),
});

const orderMinMaxSchema = z.object({
    enable_vendor_min_max_quantity: z.string(),
    min_quantity_to_order: z.string(),
    max_quantity_to_order: z.string(),
    vendor_min_max_products: z.array(z.any()), // Adjust this based on the actual structure
    vendor_min_max_product_cat: z.array(z.any()), // Adjust this based on the actual structure
    enable_vendor_min_max_amount: z.string(),
    min_amount_to_order: z.string(),
    max_amount_to_order: z.string(),
});

const categorySchema = z.object({
    term_id: z.number(),
    name: z.string(),
    slug: z.string(),
    term_group: z.number(),
    term_taxonomy_id: z.number(),
    taxonomy: z.string(),
    description: z.string(),
    parent: z.number(),
    count: z.number(),
    filter: z.string(),
});

const vendorStoreLocationPickupSchema = z.object({
    multiple_store_location: z.string(),
});

const bankPaymentRequiredFieldsSchema = z.object({
    ac_name: z.string(),
    ac_type: z.string(),
    ac_number: z.string(),
    routing_number: z.string(),
});

const activePaymentMethodsSchema = z.object({
    paypal: z.string(),
    bank: z.string(),
});

const profileCompletionSchema = z.object({
    closed_by_user: z.boolean(),
    phone: z.number(),
    store_name: z.number(),
    address: z.number(),
    location: z.number(),
    Bank: z.number(),
    paypal: z.number(),
    skrill: z.number(),
    fb: z.number(),
    youtube: z.number(),
    twitter: z.number(),
    linkedin: z.number(),
    next_todo: z.string(),
    progress: z.number(),
    progress_vals: z.object({
        banner_val: z.number(),
        profile_picture_val: z.number(),
        store_name_val: z.number(),
        address_val: z.number(),
        phone_val: z.number(),
        map_val: z.number(),
        payment_method_val: z.number(),
        social_val: z.object({
            fb: z.number(),
            twitter: z.number(),
            youtube: z.number(),
            linkedin: z.number(),
        }),
    }),
});

const ratingSchema = z.object({
    rating: z.string(),
    count: z.number(),
});

const linksSchema = z.object({
    self: z.array(z.object({ href: z.string().url() })).optional(),
    collection: z.array(z.object({ href: z.string().url() })).optional(),
    up: z.array(z.object({ href: z.string().url() })).optional(), // only for product variations
});

const storyCategorySchema = z.object({
    id: z.number(),
    count: z.number(),
    description: z.string(),
    link: z.string().url(),
    name: z.string(),
    slug: z.string(),
    taxonomy: z.string(),
    meta: z.array(z.any()), // Adjust this based on the actual structure
    _links: linksSchema,
});

const storeReviewSchema1 = z.object({
    id: z.number(),
    author: z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        url: z.string().optional(),
        avatar: z.string().url(),
    }),
    title: z.string(),
    content: z.string(),
    permalink: z.string().nullable(),
    product_id: z.number().nullable(),
    approved: z.boolean(),
    date: z.string(), // You might want to use z.date() if you want to enforce a date format
    rating: z.number(),
});

const storeReviewSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
    status: z.string(),
    created_at: z.coerce.date(),
    customer: z.object({
        id: z.number(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string().email(),
        display_name: z.string(),
    }),
    vendor: z.object({
        id: z.number(),
        first_name: z.string(),
        last_name: z.string(),
        shop_name: z.string(),
        shop_url: z.string().url(),
        avatar: z.string().url(),
        banner: z.string(),
    }),
    rating: z.number(),
    _links: linksSchema,
});

const storeSchema = z.object({
    id: z.number(),
    store_name: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    social: socialSchema,
    phone: z.string(),
    show_email: z.boolean(),
    address: addressSchema,
    location: z.string().optional(),
    banner: z.string().optional(),
    banner_id: z.number(),
    gravatar: z.string().url(),
    gravatar_id: z.number(),
    shop_url: z.string().url(),
    toc_enabled: z.boolean(),
    store_toc: z.string().optional(),
    featured: z.boolean(),
    rating: ratingSchema,
    enabled: z.boolean(),
    registered: z.string(),
    payment: z
        .object({
            bank: z
                .object({
                    ac_name: z.string().optional(),
                    ac_type: z.string().optional(),
                    ac_number: z.string().optional(),
                    bank_name: z.string().optional(),
                    bank_addr: z.string().optional(),
                    routing_number: z.string().optional(),
                    iban: z.string().optional(),
                    swift: z.string().optional(),
                })
                .partial(),
            paypal: z
                .object({
                    email: z.string().optional(),
                })
                .partial(),
            dokan_razorpay: z.boolean(),
            stripe: z.boolean(),
            dokan_moip_connect: z.boolean(),
            dokan_custom: z
                .object({
                    withdraw_method_name: z.string().optional(),
                    withdraw_method_type: z.string().optional(),
                    value: z.string().optional(),
                })
                .partial(),
        })
        .optional(),
    trusted: z.boolean(),
    store_open_close: z.object({
        enabled: z.boolean(),
        time: z
            .object({
                enabled: z.boolean().optional(),
                time: z.any().optional(),
                status: z.string().optional(),
                opening_time: z.array(z.string()).optional(),
                closing_time: z.array(z.string()).optional(),
            })
            .or(z.array(z.any())),

        open_notice: z.string(),
        close_notice: z.string(),
    }),
    sale_only_here: z.boolean().optional(),
    company_name: z.string().optional(),
    vat_number: z.string().optional(),
    company_id_number: z.string().optional(),
    bank_name: z.string().optional(),
    bank_iban: z.string().optional(),
    categories: z
        .array(
            z.object({
                id: z.number().optional(),
                name: z.string(),
                slug: z.string(),
            }),
        )
        .optional(),
    admin_category_commission: z.array(z.any()).optional(),
    admin_commission: z.string().optional(),
    admin_additional_fee: z.string().optional(),
    admin_commission_type: z.string().optional(),
    _links: linksSchema,
});

const supportTicketSchema = z.object({
    ID: z.number(),
    post_author: z.string(),
    post_date: z.coerce.date(),
    post_date_gmt: z.coerce.date(),
    post_content: z.string(),
    post_title: z.string(),
    post_excerpt: z.string(),
    post_status: z.string(),
    comment_status: z.string(),
    ping_status: z.string(),
    post_password: z.string(),
    post_name: z.string(),
    to_ping: z.string(),
    pinged: z.string(),
    post_modified: z.coerce.date(),
    post_modified_gmt: z.coerce.date(),
    post_content_filtered: z.string(),
    post_parent: z.number(),
    guid: z.string().url(),
    menu_order: z.number(),
    post_type: z.string(),
    post_mime_type: z.string(),
    comment_count: z.string(),
    filter: z.string(),
    vendor_name: z.string().optional(),
    customer_name: z.string().optional(),
    vendor_id: z.string().optional(),
    store_url: z.string().optional(),
    ticket_date: z.string().optional(),
    reading: z.string().optional(),
    ancestors: z.array(z.any()).optional(), // Adjust this based on the actual structure
    page_template: z.string().optional(),
    post_category: z.array(z.any()).optional(), // Adjust this based on the actual structure
    tags_input: z.array(z.any()).optional(), // Adjust this based on the actual structure
    _links: linksSchema.optional(),
});

const productQuestionSchema = z.object({
    id: z.number(),
    product_id: z.number(),
    question: z.string(),
    user_id: z.number(),
    read: z.number(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
    answer: z.object({
        id: z.number(),
        question_id: z.number(),
        answer: z.string(),
        user_id: z.number(),
        created_at: z.string(),
        updated_at: z.string(),
        human_readable_created_at: z.string(),
        human_readable_updated_at: z.string(),
        user_display_name: z.string(),
    }),
    user_display_name: z.string(),
    human_readable_created_at: z.string(),
    human_readable_updated_at: z.string(),
    display_human_readable_created_at: z.boolean(),
    display_human_readable_updated_at: z.boolean(),
    product: z.object({
        id: z.number(),
        title: z.string(),
        image: z.string(),
    }),
    vendor: z.object({
        id: z.number(),
        name: z.string(),
        avatar: z.string(),
    }),
    _links: linksSchema,
});

const productQuestionAnswerSchema = z.object({
    id: z.number(),
    question_id: z.number(),
    answer: z.string(),
    user_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    human_readable_created_at: z.string(),
    human_readable_updated_at: z.string(),
    user_display_name: z.string(),
    _links: linksSchema,
});

const verificationMethodSchema = z.object({
    id: z.number(),
    title: z.string(),
    help_text: z.string(),
    status: z.boolean(),
    required: z.boolean(),
    kind: z.string(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    _links: linksSchema,
});

const vendorSchema = z.object({
    store_name: z.string(),
    social: socialSchema,
    payment: paymentSchema.or(z.array(z.any())),
    phone: z.string(),
    show_email: z.string(),
    address: addressSchema.or(z.array(z.any())),
    location: z.string(),
    banner: z.number(),
    icon: z.number().or(z.string()),
    gravatar: z.number(),
    enable_tnc: z.string(),
    store_tnc: z.string(),
    show_min_order_discount: z.string(),
    store_seo: z.unknown(),
    dokan_store_time_enabled: z.string(),
    dokan_store_open_notice: z.string(),
    dokan_store_close_notice: z.string(),
    find_address: z.string().nullish(),
    dokan_category: z.string().nullish(),
    sale_only_here: z.boolean(),
    company_name: z.string(),
    vat_number: z.string(),
    company_id_number: z.string(),
    bank_name: z.string(),
    bank_iban: z.string(),
    profile_completion: z.object({
        store_name: z.number(),
        phone: z.number(),
        next_todo: z.string(),
        progress: z.number(),
        progress_vals: z.object({
            closed_by_user: z.boolean().nullish(),
            banner_val: z.number(),
            profile_picture_val: z.number(),
            store_name_val: z.number(),
            address_val: z.number(),
            phone_val: z.number(),
            map_val: z.number().nullish(),
            payment_method_val: z.number(),
            social_val: z.object({
                fb: z.number(),
                twitter: z.number(),
                youtube: z.number(),
                linkedin: z.number(),
            }),
        }),
    }),
});

const verificationRequestSchema = z.object({
    id: z.number(),
    vendor_id: z.number(),
    method_id: z.number(),
    status: z.string(),
    status_title: z.string(),
    documents: z.array(z.string().or(z.number())),
    note: z.string(),
    additional_info: z.any(),
    checked_by: z.number(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    vendor: vendorSchema,
    method: verificationMethodSchema.omit({ _links: true }),
    document_urls: z.record(
        z.object({
            url: z.string().url(),
            title: z.string(),
        }),
    ),
    _links: linksSchema,
});

const productReviewSchema = z.object({
    id: z.number().or(z.string()),
    date_created: z.string().optional(), // Assuming date_created is always a string in ISO format
    review: z.string().optional(),
    rating: z.number().or(z.string()),
    name: z.string().optional(),
    email: z.string().optional(), // Assuming email follows a standard email format
    verified: z.boolean().optional(),
});

const dimensionsSchema = z.object({
    length: z.string(),
    width: z.string(),
    height: z.string(),
});

const productCategorySchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
});

const productMetaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.any(),
});

const productSchema = z.object({
    id: z.number(),
    name: z.string(),
    slug: z.string(),
    permalink: z.string().url(),
    date_created: z.coerce.date(),
    date_created_gmt: z.coerce.date(),
    date_modified: z.coerce.date(),
    date_modified_gmt: z.coerce.date(),
    type: z.string(),
    status: z.string(),
    featured: z.boolean(),
    catalog_visibility: z.string(),
    description: z.string(),
    short_description: z.string(),
    sku: z.string().optional(),
    price: z.string(),
    regular_price: z.string(),
    sale_price: z.string().optional(),
    date_on_sale_from: z.null(),
    date_on_sale_from_gmt: z.null(),
    date_on_sale_to: z.null(),
    date_on_sale_to_gmt: z.null(),
    on_sale: z.boolean(),
    purchasable: z.boolean(),
    total_sales: z.number(),
    virtual: z.boolean(),
    downloadable: z.boolean(),
    downloads: z.array(z.unknown()),
    download_limit: z.number(),
    download_expiry: z.number(),
    external_url: z.string().optional(),
    button_text: z.string().optional(),
    tax_status: z.string(),
    tax_class: z.string().optional(),
    manage_stock: z.boolean(),
    stock_quantity: z.null(),
    backorders: z.string(),
    backorders_allowed: z.boolean(),
    backordered: z.boolean(),
    low_stock_amount: z.string().nullable(),
    sold_individually: z.boolean(),
    weight: z.string().optional(),
    dimensions: dimensionsSchema,
    shipping_required: z.boolean(),
    shipping_taxable: z.boolean(),
    shipping_class: z.string().optional(),
    shipping_class_id: z.number(),
    reviews_allowed: z.boolean(),
    average_rating: z.string().regex(/^\d+(\.\d+)?$/),
    rating_count: z.number(),
    upsell_ids: z.array(z.unknown()),
    cross_sell_ids: z.array(z.unknown()),
    parent_id: z.number(),
    purchase_note: z.string().optional(),
    categories: z.array(productCategorySchema),
    tags: z.array(z.unknown()),
    images: z.array(z.unknown()),
    attributes: z.array(z.unknown()),
    default_attributes: z.array(z.unknown()),
    variations: z.array(z.unknown()),
    grouped_products: z.array(z.unknown()),
    menu_order: z.number(),
    price_html: z.string(),
    related_ids: z.array(z.number()),
    meta_data: z.array(productMetaDataSchema),
    stock_status: z.string().optional(),
    has_options: z.boolean().optional(),
    post_password: z.string().optional(),
    tax_amount: z.string().optional(),
    regular_display_price: z.string().optional(),
    sales_display_price: z.string().optional(),
    barcode: z.string().optional(),
    _links: linksSchema,
});

const imageSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    src: z.string(),
    name: z.string(),
    alt: z.string(),
    position: z.number(),
});

const attributeSchema = z.object({
    id: z.number(),
    slug: z.string(),
    name: z.string(),
    option: z.string(),
});

const metaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.union([
        z.array(z.unknown()),
        z
            .object({
                enable_wholesale: z.string(),
                price: z.string(),
                quantity: z.number(),
            })
            .passthrough(),
    ]),
});

const productVariationSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    description: z.string(),
    permalink: z.string(),
    sku: z.string(),
    price: z.string(),
    regular_price: z.string(),
    sale_price: z.string(),
    date_on_sale_from: z.null(),
    date_on_sale_from_gmt: z.null(),
    date_on_sale_to: z.null(),
    date_on_sale_to_gmt: z.null(),
    on_sale: z.boolean(),
    visible: z.boolean(),
    purchasable: z.boolean(),
    virtual: z.boolean(),
    downloadable: z.boolean(),
    downloads: z.array(z.unknown()), // Assuming downloads is an array of unknown objects
    download_limit: z.number(),
    download_expiry: z.number(),
    tax_status: z.string(),
    tax_class: z.string(),
    manage_stock: z.boolean(),
    stock_quantity: z.null(),
    in_stock: z.boolean(),
    backorders: z.string(),
    backorders_allowed: z.boolean(),
    backordered: z.boolean(),
    weight: z.string(),
    dimensions: dimensionsSchema,
    shipping_class: z.string(),
    shipping_class_id: z.number(),
    image: imageSchema,
    attributes: z.array(attributeSchema),
    menu_order: z.number(),
    meta_data: z.array(metaDataSchema),
    _links: linksSchema,
});

const orderMetaDataSchema = z.object({
    id: z.number(),
    key: z.string(),
    value: z.string(),
});

const taxSchema = z.object({
    id: z.number(),
    total: z.string(),
    subtotal: z.string(),
});

const lineItemSchema = z.object({
    id: z.number().or(z.string()),
    name: z.string(),
    product_id: z.number(),
    variation_id: z.number(),
    quantity: z.number(),
    tax_class: z.string(),
    subtotal: z.string(),
    subtotal_tax: z.string(),
    total: z.string(),
    total_tax: z.string(),
    taxes: z.array(taxSchema),
    meta_data: z.array(z.any()), // Assuming meta_data can have various structures
    sku: z.string().nullable(),
    price: z.number(),
    image: z
        .object({
            id: z.string().or(z.number()).optional(),
            src: z.string().optional(),
        })
        .optional(),
    parent_name: z.string().nullable(),
});

const taxLineSchema = z.object({
    id: z.number(),
    rate_code: z.string(),
    rate_id: z.number(),
    label: z.string(),
    compound: z.boolean(),
    tax_total: z.string(),
    shipping_tax_total: z.string(),
    rate_percent: z.number(),
    meta_data: z.array(z.any()), // Assuming meta_data can have various structures
});

const shippingLineSchema = z.object({
    id: z.number(),
    method_title: z.string(),
    method_id: z.string(),
    instance_id: z.string().optional(),
    total: z.string(),
    total_tax: z.string(),
    taxes: z.array(taxSchema),
    meta_data: z.array(z.any()), // Assuming meta_data can have various structures
});

const orderAddressSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    company: z.string().optional(),
    address_1: z.string(),
    address_2: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string(),
    email: z.string().optional(),
    phone: z.string().optional(),
});

const orderSchema = z.object({
    id: z.number(),
    parent_id: z.number(),
    status: z.string(),
    currency: z.string(),
    version: z.string(),
    prices_include_tax: z.boolean(),
    date_created: z.string(),
    date_modified: z.string(),
    discount_total: z.string(),
    discount_tax: z.string(),
    shipping_total: z.string(),
    shipping_tax: z.string(),
    cart_tax: z.string(),
    total: z.string(),
    total_tax: z.string(),
    customer_id: z.number(),
    order_key: z.string(),
    billing: orderAddressSchema,
    shipping: orderAddressSchema,
    payment_method: z.string(),
    payment_method_title: z.string(),
    transaction_id: z.string().optional(),
    customer_ip_address: z.string().optional(),
    customer_user_agent: z.string().optional(),
    created_via: z.string(),
    customer_note: z.string().optional(),
    date_completed: z.string().nullable(),
    date_paid: z.string(),
    cart_hash: z.string().optional(),
    number: z.string(),
    meta_data: z.array(orderMetaDataSchema),
    line_items: z.array(lineItemSchema),
    tax_lines: z.array(taxLineSchema),
    shipping_lines: z.array(shippingLineSchema),
    fee_lines: z.array(z.any()), // Assuming fee_lines can have various structures
    coupon_lines: z.array(z.any()), // Assuming coupon_lines can have various structures
    refunds: z.array(z.any()), // Assuming refunds can have various structures
    payment_url: z.string(),
    is_editable: z.boolean(),
    needs_payment: z.boolean(),
    needs_processing: z.boolean(),
    date_created_gmt: z.string(),
    date_modified_gmt: z.string(),
    date_completed_gmt: z.string().nullable(),
    date_paid_gmt: z.string(),
    currency_symbol: z.string(),
    _links: linksSchema,
});

const orderDownloadSchema = z.object({
    permission_id: z.string().or(z.number()),
    download_id: z.string().or(z.number()),
    product_id: z.string().or(z.number()),
    order_id: z.string().or(z.number()),
    order_key: z.string(),
    user_email: z.string().email(),
    user_id: z.string().or(z.number()),
    downloads_remaining: z.string(), // Assuming it's an empty string when not specified
    access_granted: z.string(), // Assuming this is always a string in a specific format
    access_expires: z.any(),
    download_count: z.string().or(z.number()),
});

const orderNoteSchema = z.object({
    id: z.number().or(z.string()),
    author: z.string(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    note: z.string(),
    customer_note: z.boolean(),
    _links: z.object({
        self: z.array(z.object({ href: z.string().url() })),
        collection: z.array(z.object({ href: z.string().url() })),
        up: z.array(z.object({ href: z.string().url() })),
    }),
});

const customerSchema = z.object({
    id: z.number(),
    date_created: z.string(),
    date_created_gmt: z.string(),
    date_modified: z.string(),
    date_modified_gmt: z.string(),
    email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    role: z.string(),
    username: z.string(),
    billing: z
        .object({
            first_name: z.string(),
            last_name: z.string(),
            company: z.string(),
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            postcode: z.string(),
            country: z.string(),
            state: z.string(),
            email: z.union([z.string().email(), z.literal('')]),
            phone: z.string(),
        })
        .optional(),
    shipping: z
        .object({
            first_name: z.string(),
            last_name: z.string(),
            company: z.string(),
            address_1: z.string(),
            address_2: z.string(),
            city: z.string(),
            postcode: z.string(),
            country: z.string(),
            state: z.string(),
            phone: z.string(),
        })
        .optional(),
    is_paying_customer: z.boolean(),
    avatar_url: z.string().url(),
    meta_data: z
        .array(
            z.object({
                id: z.number(),
                key: z.string(),
                value: z.unknown(),
            }),
        )
        .optional(),
    orders_count: z.number(),
    total_spent: z.string(),
    _links: linksSchema,
});

const couponSchema = z.object({
    id: z.number(),
    code: z.string(),
    amount: z.string(),
    date_created: z.coerce.date(),
    date_created_gmt: z.coerce.date(),
    date_modified: z.coerce.date(),
    date_modified_gmt: z.coerce.date(),
    discount_type: z.string(),
    description: z.string(),
    date_expires: z.nullable(z.string()),
    date_expires_gmt: z.nullable(z.string()),
    usage_count: z.number(),
    individual_use: z.boolean(),
    product_ids: z.array(z.number()),
    excluded_product_ids: z.array(z.string()),
    usage_limit: z.nullable(z.number()),
    usage_limit_per_user: z.nullable(z.number()),
    limit_usage_to_x_items: z.nullable(z.number()),
    free_shipping: z.boolean(),
    product_categories: z.array(z.string()),
    excluded_product_categories: z.array(z.string()),
    exclude_sale_items: z.boolean(),
    minimum_amount: z.string(),
    maximum_amount: z.string(),
    email_restrictions: z.array(z.string()),
    used_by: z.array(z.string()),
    meta_data: z.array(
        z.object({
            id: z.number(),
            key: z.string(),
            value: z.string(),
        }),
    ),
    _links: linksSchema,
});

const dateEntrySchema = z.object({
    year: z.string(),
    month: z.string(),
    title: z.string(),
});

const refundSchema = z.object({
    id: z.number(),
    order_id: z.number(),
    vendor: z.object({
        id: z.number(),
        store_name: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        social: socialSchema,
        phone: z.string(),
        show_email: z.boolean(),
        address: addressSchema,
        location: z.string(),
        banner: z.string(),
        banner_id: z.number(),
        gravatar: z.string().url(),
        gravatar_id: z.number(),
        shop_url: z.string().url(),
        toc_enabled: z.boolean(),
        store_toc: z.string(),
        featured: z.boolean(),
        rating: z.object({
            rating: z.string(),
            count: z.number(),
        }),
        enabled: z.boolean(),
        registered: z.string(),
        payment: z.object({
            bank: z.object({
                ac_name: z.string(),
                ac_type: z.string(),
                ac_number: z.string(),
                bank_name: z.string(),
                bank_addr: z.string(),
                routing_number: z.string(),
                iban: z.string(),
                swift: z.string(),
            }),
            paypal: z.object({
                email: z.string(),
            }),
            dokan_razorpay: z.boolean(),
            stripe: z.boolean(),
            'dokan-moip-connect': z.boolean(),
        }),
        trusted: z.boolean(),
        store_open_close: z.object({
            enabled: z.boolean(),
            time: z.array(z.string()),
            open_notice: z.string(),
            close_notice: z.string(),
        }),
        sale_only_here: z.boolean(),
        current_subscription: z.object({
            name: z.number(),
            label: z.string(),
        }),
        assigned_subscription: z.number(),
        assigned_subscription_info: z.object({
            subscription_id: z.number(),
            has_subscription: z.boolean(),
            expiry_date: z.string(),
            published_products: z.number(),
            remaining_products: z.number(),
            recurring: z.boolean(),
            start_date: z.string(),
        }),
        company_name: z.string(),
        vat_number: z.string(),
        company_id_number: z.string(),
        bank_name: z.string(),
        bank_iban: z.string(),
        categories: z.array(
            z.object({
                term_id: z.number(),
                name: z.string(),
                slug: z.string(),
                term_group: z.number(),
                term_taxonomy_id: z.number(),
                taxonomy: z.string(),
                description: z.string(),
                parent: z.number(),
                count: z.number(),
                filter: z.string(),
            }),
        ),
    }),
    amount: z.string(),
    reason: z.string(),
    item_qtys: z.record(z.number()),
    item_totals: z.record(z.string()),
    tax_totals: z.record(z.record(z.number())),
    restock_items: z.number(),
    created: z.string(),
    status: z.string(),
    method: z.string(),
    type: z.string(),
    api: z.boolean(),
    _links: linksSchema,
});

const transactionTypeSchema = z.object({
    id: z.string(),
    title: z.string(),
});

const roleSchema = z.object({
    name: z.string(),
    capabilities: z.record(z.boolean()),
});

const quoteRuleSchema = z.object({
    id: z.string(),
    rule_name: z.string(),
    selected_user_role: z.array(z.string()).or(z.string()),
    category_ids: z.array(z.string()).or(z.string()),
    product_categories: z.array(z.string()).optional(),
    product_ids: z.array(z.string()).or(z.string()),
    hide_price: z.string(),
    hide_cart_button: z.string(),
    button_text: z.string(),
    apply_on_all_product: z.string(),
    rule_priority: z.string(),
    status: z.string(),
    created_at: z.string(),
    _links: linksSchema,
});

const quoteRequestSchema = z.object({
    id: z.string(),
    title: z.string(),
    customer_name: z.string(),
    customer_email: z.string(),
    status: z.string(),
    created_at: z.string(),
    _links: linksSchema,
});

const verndorStaffCapabilitiesSchema = z.object({
    read: z.boolean(),
    vendor_staff: z.boolean(),
    dokandar: z.boolean(),
    delete_pages: z.boolean(),
    publish_posts: z.boolean(),
    edit_posts: z.boolean(),
    delete_published_posts: z.boolean(),
    edit_published_posts: z.boolean(),
    delete_posts: z.boolean(),
    manage_categories: z.boolean(),
    moderate_comments: z.boolean(),
    upload_files: z.boolean(),
    edit_shop_orders: z.boolean(),
    edit_product: z.boolean(),
    dokan_view_sales_overview: z.boolean().optional(),
    dokan_view_sales_report_chart: z.boolean().optional(),
    dokan_view_announcement: z.boolean().optional(),
    dokan_view_order_report: z.boolean().optional(),
    dokan_view_review_reports: z.boolean(),
    dokan_view_product_status_report: z.boolean().optional(),
    dokan_add_product: z.boolean().optional(),
    dokan_edit_product: z.boolean(),
    dokan_delete_product: z.boolean(),
    dokan_view_product: z.boolean(),
    dokan_duplicate_product: z.boolean(),
    dokan_import_product: z.boolean(),
    dokan_export_product: z.boolean(),
    dokan_view_order: z.boolean(),
    dokan_manage_order: z.boolean(),
    dokan_manage_order_note: z.boolean(),
    dokan_manage_reviews: z.boolean(),
    dokan_view_overview_menu: z.boolean(),
    dokan_view_product_menu: z.boolean(),
    dokan_view_order_menu: z.boolean(),
    dokan_view_review_menu: z.boolean(),
    dokan_view_store_settings_menu: z.boolean(),
    dokan_view_store_shipping_menu: z.boolean(),
    dokan_view_store_social_menu: z.boolean(),
    dokan_view_store_seo_menu: z.boolean(),
    dokan_export_order: z.boolean(),
});

const vendorStaffSchema = z.object({
    ID: z.string(),
    user_login: z.string(),
    user_nicename: z.string(),
    user_email: z.string(),
    user_url: z.string(),
    user_registered: z.string(),
    user_activation_key: z.string(),
    user_status: z.string(),
    display_name: z.string(),
    phone: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    registered_at: z.string(),
    avatar: z.string(),
    capabilities: verndorStaffCapabilitiesSchema,
});

const wholesaleCustomerSchema = z.object({
    id: z.number().or(z.string()),
    first_name: z.string(),
    last_name: z.string(),
    username: z.string(),
    name: z.string(),
    email: z.string(),
    avatar: z.string(),
    url: z.string(),
    role: z.string(),
    registerd_date: z.string(),
    wholesale_status: z.string(),
    _links: linksSchema,
});

const whithdrawSchema = z.object({
    id: z.string().or(z.number()),
    user: z.object({
        id: z.string().or(z.number()),
        store_name: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.string(),
        social: socialSchema,
        phone: z.string(),
        show_email: z.boolean(),
        address: addressSchema,
        location: z.string(),
        banner: z.string(),
        banner_id: z.string().or(z.number()),
        gravatar: z.string(),
        gravatar_id: z.string().or(z.number()),
        shop_url: z.string(),
        toc_enabled: z.boolean(),
        store_toc: z.string(),
        featured: z.boolean(),
        rating: ratingSchema,
        enabled: z.boolean(),
        registered: z.string(),
        payment: z.object({
            bank: z
                .object({
                    ac_name: z.string(),
                    ac_type: z.string(),
                    ac_number: z.string(),
                    bank_name: z.string(),
                    bank_addr: z.string(),
                    routing_number: z.string(),
                    iban: z.string(),
                    swift: z.string(),
                    declaration: z.string(),
                })
                .nullable(), // Assuming bank is optional
            paypal: z
                .object({
                    email: z.string(),
                })
                .nullable(), // Assuming paypal is optional
            stripe_express: z.boolean().optional(),
        }),
        trusted: z.boolean(),
        store_open_close: z.object({
            enabled: z.boolean(),
            time: z
                .object({
                    enabled: z.boolean().optional(),
                    time: z.any().optional(),
                    status: z.string().optional(),
                    opening_time: z.array(z.string()).optional(),
                    closing_time: z.array(z.string()).optional(),
                })
                .or(z.array(z.any())),

            open_notice: z.string(),
            close_notice: z.string(),
        }),
        sale_only_here: z.boolean(),
        company_name: z.string(),
        vat_number: z.string(),
        company_id_number: z.string(),
        bank_name: z.string(),
        bank_iban: z.string(),
        categories: z.array(
            z.object({
                term_id: z.number(),
                name: z.string(),
                slug: z.string(),
                term_group: z.number(),
                term_taxonomy_id: z.number(),
                taxonomy: z.string(),
                description: z.string(),
                parent: z.number(),
                count: z.number(),
                filter: z.string(),
            }),
        ),
    }),
    amount: z.number(),
    created: z.string(),
    status: z.string(),
    method: z.string(),
    method_title: z.string(),
    note: z.string(),
    details: z.union([
        z.object({
            paypal: z.object({
                email: z.string(),
            }),
        }),
        z.object({
            bank: z.object({
                ac_name: z.string(),
                ac_type: z.string(),
                ac_number: z.string(),
                bank_name: z.string(),
                bank_addr: z.string(),
                routing_number: z.string(),
                iban: z.string(),
                swift: z.string(),
            }),
        }),
        z.object({
            skrill: z.object({
                email: z.string(),
            }),
        }),
    ]),
    ip: z.string(),
    _links: linksSchema,
});

const paymentMethodSchema = z.object({
    id: z.string(),
    title: z.string(),
});

const chargeDataSchema = z.object({
    fixed: z.number(),
    percentage: z.number(),
});

export const schemas = {
    abuseReportsSchema: {
        abuseReportReasonsSchema: z.array(
            z.object({
                id: z.string(),
                value: z.string(),
            }),
        ),

        abuseReportSchema: z.object({
            id: z.number(),
            reason: z.string(),
            product: z.object({
                id: z.number(),
                title: z.string(),
                admin_url: z.string().url(),
            }),
            vendor: z.object({
                id: z.number(),
                name: z.string(),
                admin_url: z.string().url(),
            }),
            reported_by: z
                .object({
                    id: z.number(),
                    name: z.string(),
                    email: z.string().email(),
                    admin_url: z.string().url(),
                })
                .nullable(),
            description: z.string(),
            reported_at: z.coerce.date(),
        }),

        abuseReportsSchema: z.array(
            z.object({
                id: z.number(),
                reason: z.string(),
                product: z.object({
                    id: z.number(),
                    title: z.string(),
                    admin_url: z.string().url().nullable(),
                }),
                vendor: z.object({
                    id: z.number(),
                    name: z.string(),
                    admin_url: z.string().url().nullable(),
                }),
                reported_by: z.object({
                    id: z.number(),
                    name: z.string(),
                    email: z.string().email(),
                    admin_url: z.string().url().nullable(),
                }),
                description: z.string(),
                reported_at: z.coerce.date(),
            }),
        ),
    },

    admin: {
        //reportOverviewSchema
        reportOverviewSchema: z.object({
            labels: z.array(z.string()),
            datasets: z.array(
                z.object({
                    label: z.string(),
                    borderColor: z.string(),
                    fill: z.boolean(),
                    data: z.array(z.union([z.string(), z.number()])),
                    tooltipLabel: z.string().optional(),
                    tooltipPrefix: z.string().optional(),
                }),
            ),
        }),

        // reportSummarySchema
        reportSummarySchema: z.object({
            products: z.object({
                this_month: z.number(),
                last_month: z.number(),
                this_period: z.null(),
                class: z.string(),
                parcent: z.number(),
            }),
            withdraw: z.object({
                pending: z.union([z.string(), z.number()]),
                completed: z.union([z.string(), z.number()]),
                cancelled: z.union([z.string(), z.number()]),
            }),
            vendors: z.object({
                inactive: z.number(),
                active: z.number(),
                this_month: z.number(),
                last_month: z.number(),
                this_period: z.null(),
                class: z.string(),
                parcent: z.number(),
            }),
            sales: z.object({
                this_month: z.number(),
                last_month: z.number(),
                this_period: z.null(),
                class: z.string(),
                parcent: z.number(),
            }),
            orders: z.object({
                this_month: z.number(),
                last_month: z.number(),
                this_period: z.null(),
                class: z.string(),
                parcent: z.number(),
            }),
            earning: z.object({
                this_month: z.number(),
                last_month: z.number(),
                this_period: z.null(),
                class: z.string(),
                parcent: z.number(),
            }),
        }),

        //adminDashboardFeedSchema
        adminDashboardFeedSchema: z.array(
            z.object({
                link: z.string(),
                title: z.string(),
                desc: z.string(),
                summary: z.string(),
                date: z.string(),
                author: z.string(),
            }),
        ),

        //adminHelpSchema
        adminHelpSchema: z.array(
            z.object({
                title: z.string(),
                icon: z.string(),
                questions: z.array(
                    z.object({
                        title: z.string(),
                        link: z.string(),
                    }),
                ),
            }),
        ),

        //adminNoticesSchema
        adminNoticesSchema: z.array(
            z.object({
                type: z.string(),
                title: z.string(),
                description: z.string().optional(),
                priority: z.number(),
                show_close_button: z.boolean().optional(),
                ajax_data: z
                    .object({
                        action: z.string(),
                        nonce: z.string().optional(),
                        key: z.string().optional(),
                        dokan_promotion_dismissed: z.boolean().optional(),
                        _wpnonce: z.string().optional(),
                    })
                    .optional(),
                actions: z
                    .array(
                        z.object({
                            type: z.string(),
                            text: z.string(),
                            action: z.string().optional(),
                            target: z.string().optional(),
                            loading_text: z.string().optional(),
                            completed_text: z.string().optional(),
                            reload: z.boolean().optional(),
                            ajax_data: z
                                .object({
                                    action: z.string(),
                                    nonce: z.string().optional(),
                                })
                                .optional(),
                        }),
                    )
                    .optional(),
            }),
        ),

        //changelogLiteSchema
        changelogLiteSchema: z.string(),

        //changelogProSchema
        changelogProSchema: z.string(),

        //adminPromoNoticeSchema
        adminPromoNoticeSchema: z.array(z.unknown()),

        //adminLogsSchema
        adminLogsSchema: z.array(
            z.object({
                order_id: z.string(),
                vendor_id: z.string(),
                vendor_name: z.string(),
                previous_order_total: z.string(),
                order_total: z.string(),
                vendor_earning: z.string().or(z.number()),
                commission: z.string(),
                dokan_gateway_fee: z.union([z.string(), z.number()]),
                gateway_fee_paid_by: z.string(),
                shipping_total: z.string(),
                shipping_total_refunded: z.string(),
                shipping_total_remains: z.string(),
                has_shipping_refund: z.boolean(),
                shipping_total_tax: z.string(),
                shipping_total_tax_refunded: z.string(),
                shipping_total_tax_remains: z.string(),
                has_shipping_tax_refund: z.boolean(),
                tax_total: z.string(),
                tax_total_refunded: z.string(),
                tax_total_remains: z.string(),
                has_tax_refund: z.boolean(),
                status: z.string(),
                date: z.string(),
                has_refund: z.boolean(),
                shipping_recipient: z.string(),
                shipping_tax_recipient: z.string(),
                tax_recipient: z.string(),
            }),
        ),

        //adminExportLogsSchema
        adminExportLogsSchema: z.object({
            step: z.string().or(z.number()),
            percentage: z.number(),
            columns: z
                .object({
                    order_id: z.string(),
                    vendor_id: z.string(),
                    vendor_name: z.string(),
                    previous_order_total: z.string(),
                    order_total: z.string(),
                    vendor_earning: z.string(),
                    commission: z.string(),
                    dokan_gateway_fee: z.string(),
                    gateway_fee_paid_by: z.string(),
                    shipping_total: z.string(),
                    tax_total: z.string(),
                    status: z.string(),
                    date: z.string(),
                })
                .or(z.null()),
        }),
    },

    announcementsSchema: {
        announcementSchema: z.object({
            id: z.number(),
            notice_id: z.number(),
            vendor_id: z.number(),
            title: z.string(),
            content: z.string(),
            status: z.enum(['all', 'publish', 'pending', 'draft', 'future', 'trash']),
            read_status: z.enum(['read', 'unread', '']),
            date: z.string(),
            date_gmt: z.string(),
            human_readable_date: z.string(),
            announcement_sellers: z.array(
                z.object({
                    id: z.string(),
                    name: z.string(),
                    shop_name: z.string(),
                    email: z.string().email(),
                }),
            ),
            announcement_type: z.string(),
            _links: linksSchema,
        }),

        m: z.coerce.date(),
        announcementsSchema: z.array(
            z.object({
                id: z.number(),
                notice_id: z.number(),
                vendor_id: z.number(),
                title: z.string(),
                content: z.string(),
                status: z.enum(['all', 'publish', 'pending', 'draft', 'future', 'trash']),
                read_status: z.enum(['read', 'unread', '']),
                date: z.coerce.date(),
                date_gmt: z.coerce.date().or(z.string()),
                human_readable_date: z.string(),
                announcement_sellers: z.array(
                    z.object({
                        id: z.string().or(z.number()),
                        name: z.string(),
                        shop_name: z.string(),
                        email: z.string().email(),
                    }),
                ),
                announcement_type: z.string(),
                _links: linksSchema,
            }),
        ),

        batchUpdateAnnouncementsSchema: z.object({
            success: z.boolean(),
        }),

        announcementNoticeSchema: z.object({
            id: z.number(),
            notice_id: z.number(),
            vendor_id: z.number(),
            title: z.string(),
            content: z.string(),
            status: z.string(),
            read_status: z.string(),
            date: z.coerce.date(),
            date_gmt: z.coerce.date(),
            human_readable_date: z.string(),
            _links: linksSchema,
        }),

        deleteAnnouncementNoticeSchema: z.object({
            success: z.boolean(),
        }),
    },

    attributesSchema: {
        attributeSchema: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            type: z.enum(['select']),
            order_by: z.enum(['menu_order', 'name', 'name_num', 'id']),
            has_archives: z.boolean(),
            _links: linksSchema,
        }),

        attributesSchema: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                slug: z.string(),
                type: z.enum(['select']),
                order_by: z.enum(['menu_order', 'name', 'name_num', 'id']),
                has_archives: z.boolean(),
                _links: linksSchema,
            }),
        ),

        batchUpdateAttributesSchema: z.object({
            create: z
                .array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                        type: z.enum(['select']),
                        order_by: z.enum(['menu_order', 'name', 'name_num', 'id']),
                        has_archives: z.boolean(),
                        _links: linksSchema,
                    }),
                )
                .optional(),
            update: z
                .array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                        type: z.enum(['select']),
                        order_by: z.enum(['menu_order', 'name', 'name_num', 'id']),
                        has_archives: z.boolean(),
                        _links: linksSchema,
                    }),
                )
                .optional(),
            delete: z
                .array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                        type: z.enum(['select']),
                        order_by: z.enum(['menu_order', 'name', 'name_num', 'id']),
                        has_archives: z.boolean(),
                        _links: linksSchema,
                    }),
                )
                .optional(),
        }),

        setDefaultAttributeSchema: z.boolean(),
        updateProductAttributeSchema: z.boolean(),
    },

    attributeTermsSchema: {
        attributeTermSchema: z.object({
            id: z.number(),
            name: z.string(),
            slug: z.string(),
            description: z.string(),
            menu_order: z.number(),
            count: z.number(),
            _links: linksSchema,
        }),

        attributeTermsSchema: z.array(
            z.object({
                id: z.number(),
                name: z.string(),
                slug: z.string(),
                description: z.string(),
                menu_order: z.number(),
                count: z.number(),
                _links: linksSchema,
            }),
        ),

        batchUpdateAttributesSchema: z.object({
            update: z.array(
                z.object({
                    id: z.number(),
                    name: z.string(),
                    slug: z.string(),
                    description: z.string(),
                    menu_order: z.number(),
                    count: z.number(),
                    _links: linksSchema,
                }),
            ),
        }),
    },

    couponsSchema: {
        couponSchema: couponSchema,
        couponsSchema: z.array(couponSchema),
    },

    customersSchema: {
        customerSchema: customerSchema,
        customersSchema: z.array(customerSchema),

        batchUpdateCustomersSchema: z.object({
            create: z.array(customerSchema).optional(),
            update: z.array(customerSchema).optional(),
            delete: z.array(customerSchema).optional(),
        }),
    },

    dummyDataSchema: {
        dummyDataStatusSchema: z.object({
            import_status: z.enum(['yes', 'no']),
        }),
        importDummyDataSchema: z.object({
            result: z.object({
                imported: z.array(z.number()),
                failed: z.array(z.unknown()),
                updated: z.array(z.unknown()),
                skipped: z.array(z.unknown()),
            }),
            vendor_index: z.number(),
        }),
        clearDummyDataClearSchema: z.object({
            message: z.string(),
        }),
    },

    followStoresSchema: {
        followStatusSchema: z.object({
            status: z.boolean(),
        }),
        followUnfollowSchema: z.object({
            status: z.enum(['following', 'unfollowed']),
        }),
        followersSchema: z.array(
            z.object({
                id: z.number(),
                first_name: z.string(),
                last_name: z.string(),
                full_name: z.string(),
                avatar_url: z.string().url(),
                avatar_url_2x: z.string().url(),
                followed_at: z.coerce.date(),
                formatted_followed_at: z.string(),
            }),
        ),
    },

    modulesSchema: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            thumbnail: z.string().url(),
            plan: z.array(z.string()),
            active: z.boolean(),
            available: z.boolean(),
            doc_id: z.union([z.string(), z.number()]).nullable(),
            doc_link: z.string().nullable(),
            mod_link: z.string().nullable(),
            pre_requisites: z.string().nullable(),
            categories: z.array(z.string()).nullable(),
            video_id: z.string().nullable(),
        }),
    ),

    orderDownloadsSchema: {
        orderDownloadSchema: orderDownloadSchema,
        orderDownloadsSchema: z.object({
            downloads: z.array(orderDownloadSchema),
        }),
        createOrderDownlaodSchema: z.record(z.string(), z.string()),
        deleteOrderDownlaodSchema: z.object({ success: z.boolean() }),
    },

    ordersSchema: {
        orderSchema: orderSchema,
        ordersSchema: z.array(orderSchema),
    },

    orderNotesSchema: {
        orderNoteSchema: orderNoteSchema,
        orderNotesSchema: z.array(orderNoteSchema),
    },

    productAdvertisementsSchema: {
        // advertised product stores schema
        advertisedProductStoresSchema: z.array(
            z.object({
                vendor_id: z.string(),
                store_name: z.string(),
            }),
        ),

        // advertised product schema
        advertisedProductSchema: z.array(
            z.object({
                id: z.number(),
                product_id: z.number(),
                product_title: z.string(),
                vendor_id: z.number(),
                store_name: z.string(),
                created_via: z.string(),
                order_id: z.number(),
                price: z.string(),
                expires_at: z.string(),
                status: z.number(),
                post_status: z.string(),
                added: z.string(),
                _links: linksSchema,
            }),
        ),

        // create product advertisement schema
        createProductAdvertisementSchema: z.object({
            id: z.string(),
            product_id: z.string(),
            created_via: z.string(),
            order_id: z.string(),
            price: z.string(),
            expires_at: z.string(),
            status: z.string(),
            added: z.string(),
            updated: z.string(),
            product_title: z.string(),
            post_status: z.string(),
            vendor_id: z.string(),
            store_name: z.string(),
        }),

        // expire product advertisement schema
        expireProductAdvertisementSchema: z.number(),

        // delete product advertisement schema
        deleteProductAdvertisementSchema: z.number(),

        // update batch advertisement schema
        updateBatchProductAdvertisementSchema: z.number(),
    },

    productBlocksSchema: {
        productBlockSchema: z.object({
            general: z.object({
                name: z.string(),
                slug: z.string(),
                price: z.string(),
                type: z.string(),
                downloadable: z.boolean(),
                virtual: z.boolean(),
                regular_price: z.string(),
                sale_price: z.string(),
                date_on_sale_from: z.null().optional(),
                date_on_sale_to: z.null().optional(),
                images: z.array(
                    z.object({
                        id: z.number(),
                        date_created: z.string(),
                        date_created_gmt: z.string(),
                        date_modified: z.string(),
                        date_modified_gmt: z.string(),
                        src: z.string(),
                        name: z.string(),
                        alt: z.string(),
                        position: z.number(),
                    }),
                ),
                tags: z.array(z.unknown()), // Assuming tags can be any type
                description: z.string(),
                short_description: z.string(),
                post_status: z.string(),
                status: z.string(),
                catalog_visibility: z.string(),
                categories: z.array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                    }),
                ),
                chosen_cat: z.array(z.number()),
                external_url: z.string().optional(),
                button_text: z.string().optional(),
            }),
            inventory: z.object({
                sku: z.string(),
                stock_status: z.string(),
                manage_stock: z.boolean(),
                stock_quantity: z.null().optional(),
                low_stock_amount: z.string(),
                backorders: z.string(),
                sold_individually: z.boolean(),
            }),
            downloadable: z.object({
                downloads: z.array(z.unknown()), // Assuming downloads can be any type
                enable_limit_expiry: z.boolean(),
                download_limit: z.number(),
                download_expiry: z.number(),
            }),
            advanced: z.object({
                purchase_note: z.string(),
                reviews_allowed: z.boolean(),
            }),
            geolocation: z
                .object({
                    use_store_settings: z.string(),
                    dokan_geo_latitude: z.string(),
                    dokan_geo_longitude: z.string(),
                    dokan_geo_public: z.string(),
                    dokan_geo_address: z.string(),
                    store_has_settings: z.boolean(),
                    store_settings_url: z.string(),
                })
                .optional(),
            product_advertising: z
                .object({
                    advertisement_data: z
                        .object({
                            vendor_id: z.number(),
                            product_id: z.number(),
                            subscription_status: z.boolean(),
                            remaining_slot: z.number(),
                            global_remaining_slot: z.number(),
                            subscription_remaining_slot: z.number(),
                            listing_price: z.string(),
                            expires_after_days: z.string(),
                            subscription_expires_after_days: z.number(),
                            already_advertised: z.boolean(),
                            can_advertise_for_free: z.boolean(),
                            expire_date: z.string(),
                            post_status: z.string(),
                        })
                        .optional(),
                    dokan_advertise_single_product: z.boolean(),
                })
                .optional(),
            rma: z
                .object({
                    dokan_rma_product_override: z.boolean(),
                    warranty_label: z.string(),
                    warranty_type: z.string(),
                    warranty_length: z.string(),
                    warranty_length_value: z.string(),
                    warranty_length_duration: z.string(),
                    warranty_reason: z.array(z.string()),
                    addon_settings: z.array(z.unknown()), // Assuming addon_settings can be any type
                    warranty_policy: z.string(),
                })
                .optional(),
            wholesale: z
                .object({
                    wholesale_price: z.string(),
                    wholesale_quantity: z.string(),
                    enable_wholesale: z.boolean(),
                })
                .optional(),
            order_min_max: z
                .object({
                    product_wise_activation: z.string(),
                    min_quantity: z.string().or(z.number()),
                    max_quantity: z.string().or(z.number()),
                    min_amount: z.string().or(z.number()),
                    max_amount: z.string().or(z.number()),
                    _donot_count: z.string().or(z.number()),
                    ignore_from_cat: z.string().or(z.number()),
                })
                .optional(),
            linked: z
                .object({
                    upsell_ids: z.array(z.number()),
                    cross_sell_ids: z.array(z.number()),
                    grouped_products: z.array(z.number()),
                })
                .optional(),
            shipping_tax: z
                .object({
                    _disable_shipping: z.boolean(),
                    _weight: z.string(),
                    _length: z.string(),
                    _width: z.string(),
                    _height: z.string(),
                    shipping_class: z.string(),
                    _overwrite_shipping: z.boolean(),
                    _additional_price: z.string(),
                    _additional_qty: z.string(),
                    _dps_processing_time: z.string(),
                    _tax_status: z.string(),
                    _tax_class: z.string(),
                })
                .optional(),
            attributes: z
                .object({
                    _has_attribute: z.boolean(),
                    _create_variations: z.boolean(),
                    _product_attributes: z.array(z.unknown()), // Assuming _product_attributes can be any type
                    _default_attributes: z.array(z.unknown()), // Assuming _default_attributes can be any type
                })
                .optional(),
        }),
    },

    productFilterSchema: z.object({
        allDates: z.array(dateEntrySchema),
    }),

    productReviewsSchema: {
        productReviewSchema: productReviewSchema,
        productReviewsSchema: z.array(productReviewSchema),
        productReviewsSummarySchema: z.object({
            comment_counts: z.object({
                moderated: z.number(),
                approved: z.number(),
                spam: z.number(),
                trash: z.number(),
                total: z.number(),
            }),
            reviews_url: z.string(),
        }),
        updateProductReviewSchema: productReviewSchema.omit({ id: true }),
    },

    productsSchema: {
        productSchema: productSchema,
        productsSchema: z.array(productSchema),
    },

    productVariationsSchema: {
        productVariationSchema: productVariationSchema,
        productVariationsSchema: z.array(productVariationSchema),
        batchUpdateproductVariationsSchema: z.object({
            create: z.array(productVariationSchema).optional(),
            update: z.array(productVariationSchema).optional(),
            delete: z.array(productVariationSchema).optional(),
        }),
    },

    quoteRuleSchema: {
        quoteRuleSchema: quoteRuleSchema,
        quoteRulesSchema: z.array(quoteRuleSchema),
        batchUpdatequoteRulesSchema: z.boolean(),
    },

    quoteRequestsSchema: {
        quoteRequestSchema: quoteRequestSchema,
        quoteRequestsSchema: z.array(quoteRequestSchema),

        singleQuoteRequestSchema: z.object({
            quote_id: z.string(),
            title: z.string(),
            customer_info: z.object({
                name_field: z.string(),
                email_field: z.string().email(),
                company_field: z.string(),
                phone_field: z.string(),
            }),
            customer: z.object({
                user_id: z.number(),
                user_login: z.string(),
                user_email: z.string(),
            }),
            products: z.array(
                z.object({
                    id: z.number().or(z.string()),
                    images: z.array(z.unknown()), // Assuming images can be any array
                    permalink: z.string().url(),
                    name: z.string(),
                    store: z.object({}),
                    price: z.string(), // Assuming price and other numeric values are strings
                    offer_price: z.string(),
                    offer_product_quantity: z.string(),
                }),
            ),

            quote_details: z.array(
                z.object({
                    id: z.string(),
                    quote_id: z.string(),
                    product_id: z.string(),
                    quantity: z.string(),
                }),
            ),
            status: z.string(),
            _links: linksSchema,
        }),

        createQuoteRequestSchema: z.array(
            z.object({
                data: z.object({
                    id: z.string(),
                    title: z.string(),
                    customer_name: z.string(),
                    customer_email: z.string(),
                    status: z.string(),
                    created_at: z.string(),
                }),
                headers: z.array(z.unknown()), // Assuming headers can be any array
                status: z.number(), // Assuming status is a number
            }),
        ),

        batchUpdatequoteRequestsSchema: z.boolean(),
    },

    rankMathSchema: {}, //TODO: add schema

    refundsSchema: {
        refundSchema: refundSchema,
        refundsSchema: z.array(refundSchema),
        batchUpdateRefundsSchema: z.object({
            success: z
                .object({
                    completed: z.array(z.number()).optional(),
                })
                .optional(),
            failed: z
                .object({
                    completed: z.array(z.number()).optional(),
                })
                .or(z.array(z.unknown())),
        }),
    },

    reportsSchema: {
        // sales overview schema
        salesOverviewSchema: z.object({
            seller_id: z.number(),
            order_counts: z.array(z.unknown()), // Assuming it can contain any data type
            coupons: z.array(z.unknown()), // Assuming it can contain any data type
            order_items: z.array(z.unknown()), // Assuming it can contain any data type
            refunded_order_items: z.number(),
            orders: z.array(z.unknown()), // Assuming it can contain any data type
            full_refunds: z.array(z.unknown()), // Assuming it can contain any data type
            partial_refunds: z.array(z.unknown()), // Assuming it can contain any data type
            refund_lines: z.array(z.unknown()), // Assuming it can contain any data type
            total_tax_refunded: z.number(),
            total_shipping_refunded: z.number(),
            total_shipping_tax_refunded: z.number(),
            total_refunds: z.number(),
            refunded_orders: z.array(z.unknown()), // Assuming it can contain any data type
            total_tax: z.string(),
            total_shipping: z.string(),
            total_shipping_tax: z.string(),
            total_sales: z.string(),
            net_sales: z.string(),
            average_sales: z.string(),
            average_total_sales: z.string(),
            total_coupons: z.string(),
            total_refunded_orders: z.number(),
            total_orders: z.number(),
            total_items: z.number(),
        }),
        // summary report schema
        summaryReportSchema: z.object({
            pageviews: z.number(),
            orders_count: z.object({
                'wc-pending': z.number(),
                'wc-completed': z.number(),
                'wc-on-hold': z.number(),
                'wc-processing': z.number(),
                'wc-refunded': z.number(),
                'wc-cancelled': z.number(),
                'wc-failed': z.number(),
                'wc-checkout-draft': z.number(),
                total: z.number(),
            }),
            sales: z.number(),
            seller_balance: z.string(),
        }),
        // top earners schema
        topEarnersSchema: z.array(
            z.object({
                id: z.number(),
                title: z.string(),
                url: z.string().url(),
                edit_url: z.string().url(),
                sold_qty: z.string(), // Assuming sold_qty can be any string format
            }),
        ),
        // top selling products schema
        topSellingProductsSchema: z.any(),
    },

    reverseWithdrawalSchema: {
        transactionTypesSchema: z.array(transactionTypeSchema),
        reverseWithdrawalStoresSchema: z.array(
            z.object({
                id: z.string().or(z.number()),
                name: z.string(),
            }),
        ),
        reverseWithdrawalStoreBalanceSchema: z.array(
            z.object({
                store_name: z.string(),
                vendor_id: z.number(),
                debit: z.string(), // Assuming debit and credit can be represented as strings with decimal places
                credit: z.string(),
                balance: z.number(), // Assuming balance is represented as a number
                last_payment_date: z.string(), // Assuming last_payment_date is a string representation
                _links: linksSchema,
            }),
        ),
        reverseWithdrawalTransactionsSchema: z.array(
            z.object({
                id: z.string().or(z.number()),
                trn_id: z.string().or(z.number()),
                trn_url: z.string(),
                trn_date: z.string(), // Assuming trn_date is a string representation of a date
                trn_type: z.string(),
                trn_type_raw: z.string(),
                vendor_id: z.string().or(z.number()),
                note: z.string(),
                debit: z.string().or(z.number()),
                credit: z.string().or(z.number()),
                balance: z.string().or(z.number()),
                _links: linksSchema,
            }),
        ),
        reverseWithdrawalVendorDueStatusSchema: z.object({
            status: z.boolean(),
            due_date: z.string(),
            balance: z.number(),
            formatted_balance: z.string(),
            billing_type: z.string(),
            formatted_billing_type: z.string(),
            billing_day: z.number(),
            due_period: z.number(),
            threshold: z.number(),
            formatted_threshold: z.string(),
            payable_amount: z.number(),
            formatted_payable_amount: z.string(),
            display_notice: z.boolean(),
            formatted_failed_actions: z.string(),
            formatted_action_taken_message: z.string(),
        }),
        reverseWithdrawalAddProductToCartSchema: z.object({
            status: z.boolean(),
        }),
    },

    rolesSchema: z.object({
        roles: z.object({
            administrator: roleSchema,
            editor: roleSchema,
            author: roleSchema,
            contributor: roleSchema,
            subscriber: roleSchema,
            customer: roleSchema,
            shop_manager: roleSchema,
            seller: roleSchema,
            vendor_staff: roleSchema,
            translator: roleSchema,
        }),

        role_objects: z.object({
            administrator: roleSchema,
            editor: roleSchema,
            author: roleSchema,
            contributor: roleSchema,
            subscriber: roleSchema,
            customer: roleSchema,
            shop_manager: roleSchema,
            seller: roleSchema,
            vendor_staff: roleSchema,
            translator: roleSchema,
        }),
        role_names: z.record(z.string()),
        role_key: z.array(z.string()),
        use_db: z.array(z.boolean()),
    }),

    sellerBadgeSchema: {
        verificationTypesSchema: z.object({
            id_verification: verificationTypeSchema,
            company_verification: verificationTypeSchema,
            address_verification: verificationTypeSchema,
            phone_verification: verificationTypeSchema,
            social_profiles: verificationTypeSchema,
        }),

        badgeEventsSchema: z.array(badgeEventSchema),

        badgeSchema: badgeSchema,

        badgesSchema: z.array(badgeSchema),

        badgeSeenSchema: z.boolean(),

        badgeCreateUpdateSchema: badgeCreateUpdateSchema,

        deleteBadgeSchema: z.object({
            deleted: z.boolean(),
        }),

        batchUpdateBadgesSchema: z.array(badgeCreateUpdateSchema),
    },

    settingsSchema: {
        storeSettingsSchema: z.object({
            store_name: z.string(),
            social: socialSchema,
            payment: paymentSchema,
            phone: z.string(),
            show_email: z.string(),
            address: addressSchema,
            location: z.string(),
            banner: z.number(),
            icon: z.string(),
            gravatar: z.number(),
            enable_tnc: z.string(),
            store_tnc: z.string(),
            show_min_order_discount: z.string(),
            store_seo: z.array(z.any()), // Adjust this based on the actual structure
            dokan_store_time_enabled: z.string(),
            dokan_store_open_notice: z.string(),
            dokan_store_close_notice: z.string(),
            dokan_store_time: storeTimeSchema,
            sale_only_here: z.boolean(),
            company_name: z.string(),
            vat_number: z.string(),
            company_id_number: z.string(),
            bank_name: z.string(),
            bank_iban: z.string(),
            profile_completion: profileCompletionSchema,
            find_address: z.string(),
            catalog_mode: catalogModeSchema,
            order_min_max: orderMinMaxSchema,
            categories: z.array(categorySchema),
            vendor_biography: z.string(),
            show_support_btn_product: z.string(),
            support_btn_name: z.string(),
            show_support_btn: z.string(),
            setting_go_vacation: z.string(),
            settings_closing_style: z.string(),
            setting_vacation_message: z.string(),
            seller_vacation_schedules: z.array(z.any()), // Adjust this based on the actual structure
            vendor_store_location_pickup: vendorStoreLocationPickupSchema,
            bank_payment_required_fields: bankPaymentRequiredFieldsSchema,
            active_payment_methods: activePaymentMethodsSchema,
        }),

        setStoreSchema: z.object({
            id: z.number(),
            store_name: z.string(),
            first_name: z.string(),
            last_name: z.string(),
            email: z.string().email(),
            social: socialSchema,
            phone: z.string(),
            show_email: z.boolean(),
            address: addressSchema,
            location: z.string(),
            banner: z.string(),
            banner_id: z.number(),
            gravatar: z.string(),
            gravatar_id: z.number(),
            shop_url: z.string().url(),
            toc_enabled: z.boolean(),
            store_toc: z.string(),
            featured: z.boolean(),
            rating: ratingSchema,
            enabled: z.boolean(),
            registered: z.string(),
            payment: paymentSchema,
            trusted: z.boolean(),
            store_open_close: timeSchema,
            sale_only_here: z.boolean(),
            company_name: z.string(),
            vat_number: z.string(),
            company_id_number: z.string(),
            bank_name: z.string(),
            bank_iban: z.string(),
            categories: z.array(categorySchema),
            _links: linksSchema,
        }),
    },

    settingsGroupSchema: {}, //TODO: add schema

    spmvSchema: {
        spmvSettingsSchema: z.object({
            isEnabled: z.boolean(),
        }),

        spmvProductsSchema: z.array(
            z.object({
                average_rating: z.string(),
                title: z.string(),
                image: z.string(),
                permalink: z.string(),
                review_count: z.number(),
                type: z.string(),
                id: z.number(),
                price: z.string(),
                price_html: z.string(),
                category_list: z.string(),
                vendor_name: z.string(),
                action: z.string(),
            }),
        ),

        addToStoreSchema: z.object({
            status: z.boolean(),
            success_message: z.string(),
        }),
    },

    storeCategoriesSchema: {
        storyCategorySchema: storyCategorySchema,
        storeCategoriesSchema: z.array(storyCategorySchema),
        deleteStoryCategorySchema: z.object({
            deleted: z.boolean(),
            previous: storyCategorySchema.omit({ _links: true }),
        }),
    },

    storeReviewsSchema: {
        storeReviewSchemaStoreEndpint: storeReviewSchema1,
        storeReviewsSchemaStoreEndpint: z.array(storeReviewSchema1),
        storeReviewSchema: storeReviewSchema,
        storeReviewsSchema: z.array(storeReviewSchema),
        batchUpdateStoreReviewsSchema: z.boolean(),
    },

    storesSchema: {
        storeSchema: storeSchema,
        storesSchema: z.array(storeSchema),
        storeStatsSchema: z.object({
            products: z.object({
                total: z.number(),
                sold: z.number(),
                visitor: z.number(),
            }),
            revenue: z.object({
                orders: z.number(),
                sales: z.number(),
                earning: z.number(),
            }),
            others: z.object({
                commission_rate: z.string().optional(),
                additional_fee: z.string().optional(),
                commission_type: z.string().optional(),
                balance: z.number(),
                reviews: z.number(),
            }),
        }),

        storeCurrentVisitorSchema: z.object({
            user: z.object({
                user_login: z.string(),
                email: z.string().email(),
                first_name: z.string(),
                last_name: z.string(),
                display_name: z.string(),
            }),
        }),

        storeCategoriesSchema: z
            .object({
                term_id: z.number(),
                name: z.string(),
                slug: z.string(),
                term_group: z.number(),
                term_taxonomy_id: z.number(),
                taxonomy: z.string(),
                description: z.string(),
                parent: z.number(),
                count: z.number(),
                filter: z.string(),
                thumbnail: z.string().url(),
                image: z.string().url(),
                icon: z.string(),
                icon_color: z.string(),
                display_type: z.string(),
                admin_commission_type: z.string(),
                commission: z.array(z.any()),
            })
            .or(z.any()),
        storeProductsSchema: z.array(productSchema),
        storeReviewsSchema: z.array(storeReviewSchema1),
        storeSlugCheckSchema: z.object({ url: z.string(), available: z.boolean() }),
        clientContactStoreSchema: z.object({
            store_id: z.number(),
            data: z.string(),
            sender_name: z.string(),
            sender_email: z.string(),
            sender_message: z.string(),
        }),
        adminEmailStoreSchema: z.object({
            success: z.boolean(),
        }),
        batchUpdateStoreSchema: z.object({
            approved: z.array(storeSchema).optional(),
            pending: z.array(storeSchema).optional(),
        }),
    },

    supportTicketsSchema: {
        supportTicketCustomerSchema: z.array(
            z.object({
                ID: z.string(),
                display_name: z.string(),
            }),
        ),
        supportTicketSchema: supportTicketSchema,
        supportTicketsSchema: z.array(supportTicketSchema),
        singleSupportTicketSchema: z.object({
            topic: supportTicketSchema, // Assuming topic can be any array structure
            comments: z.array(z.any()), // Assuming comments can be any array structure
            store_info: z.object({
                store_name: z.string(),
                social: socialSchema,
                payment: z.object({
                    paypal: z.object({
                        email: z.string(),
                    }),
                    bank: z.object({
                        ac_name: z.string(),
                        ac_type: z.string(),
                        ac_number: z.string(),
                        bank_name: z.string(),
                        bank_addr: z.string(),
                        routing_number: z.string(),
                        iban: z.string(),
                        swift: z.string(),
                    }),
                }),
                phone: z.string(),
                show_email: z.string(), // Assuming "yes" or "no"
                address: addressSchema,
                location: z.string(),
                banner: z.number(),
                icon: z.number().or(z.string()),
                gravatar: z.number(),
                enable_tnc: z.string(), // Assuming "on" or "off"
                store_tnc: z.string(),
                show_min_order_discount: z.string(), // Assuming "yes" or "no"
                store_seo: z.array(z.any()), // Assuming store_seo can be any array structure
                dokan_store_time_enabled: z.string(), // Assuming "yes" or "no"
                dokan_store_open_notice: z.string(),
                dokan_store_close_notice: z.string(),
                sale_only_here: z.boolean(),
                company_name: z.string(),
                vat_number: z.string(),
                company_id_number: z.string(),
                bank_name: z.string(),
                bank_iban: z.string(),
                categories: z.array(
                    z.object({
                        term_id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                        term_group: z.number(),
                        term_taxonomy_id: z.number(),
                        taxonomy: z.string(),
                        description: z.string(),
                        parent: z.number(),
                        count: z.number(),
                        filter: z.string(),
                    }),
                ),
                store_url: z.string(),
            }),
            site_image_url: z.string(),
            site_title: z.string(),
            unread_topics_count: z.number(),
            dokan_admin_email_notification_global: z.boolean(),
            dokan_admin_email_notification: z.string(),
        }),
        supportTicketCommentSchema: z.number(),
        supportTicketStatusSchema: z.object({
            success: z.boolean(),
            data: z.object({
                result: z.string(),
                message: z.string(),
            }),
        }),
        supportTicketEmailSchema: z.object({
            result: z.boolean(),
            message: z.string(),
            type: z.string(),
        }),
        deleteSupportTicketSchema: z.boolean(),
        batchUpdateSupportTicketSchema: z
            .object({
                closed: z.array(z.number()),
            })
            .or(z.array(z.unknown())),
    },

    vendorDashboardSchema: {
        // statistics schema
        statisticsSchema: z.object({
            balance: z.string(),
            orders: z.object({
                'wc-pending': z.number(),
                'wc-completed': z.number(),
                'wc-on-hold': z.number(),
                'wc-processing': z.number(),
                'wc-refunded': z.number(),
                'wc-cancelled': z.number(),
                'wc-failed': z.number(),
                'wc-checkout-draft': z.number(),
                total: z.number(),
            }),
            products: z.object({
                publish: z.number(),
                future: z.number(),
                draft: z.number(),
                pending: z.number(),
                private: z.number(),
                trash: z.number(),
                'auto-draft': z.number(),
                inherit: z.number(),
                'request-pending': z.number(),
                'request-confirmed': z.number(),
                'request-failed': z.number(),
                'request-completed': z.number(),
                'wc-active': z.number().optional(),
                'wc-switched': z.number().optional(),
                'wc-expired': z.number().optional(),
                'wc-pending-cancel': z.number().optional(),
                'wc-pending': z.number(),
                'wc-processing': z.number(),
                'wc-on-hold': z.number(),
                'wc-completed': z.number(),
                'wc-cancelled': z.number(),
                'wc-refunded': z.number(),
                'wc-failed': z.number(),
                'wc-checkout-draft': z.number(),
                complete: z.number().optional(),
                paid: z.number().optional(),
                confirmed: z.number().optional(),
                unpaid: z.number().optional(),
                'pending-confirmation': z.number().optional(),
                cancelled: z.number().optional(),
                'in-cart': z.number().optional(),
                'was-in-cart': z.number().optional(),
                vacation: z.number().optional(),
                open: z.number().optional(),
                closed: z.number().optional(),
                total: z.number(),
            }),
            sales: z.string(),
            earnings: z.string(),
            views: z.any(),
        }),

        // profile schema
        profileSchema: z.object({
            store_name: z.string(),
            social: z
                .object({
                    fb: z.string().url(),
                    youtube: z.string().url(),
                    twitter: z.string().url(),
                    linkedin: z.string().url(),
                    pinterest: z.string().url(),
                    instagram: z.string().url(),
                    flickr: z.string().url(),
                })
                .or(z.array(z.any())),
            payment: z.object({
                bank: z
                    .object({
                        ac_name: z.string(),
                        ac_type: z.string(),
                        ac_number: z.string(),
                        bank_name: z.string(),
                        bank_addr: z.string(),
                        routing_number: z.string(),
                        iban: z.string(),
                        swift: z.string(),
                    })
                    .or(z.array(z.any())),
                paypal: z
                    .object({
                        email: z.string(),
                    })
                    .or(z.array(z.any())),
            }),
            phone: z.string(),
            show_email: z.string(),
            address: z
                .object({
                    street_1: z.string(),
                    street_2: z.string(),
                    city: z.string(),
                    zip: z.string(),
                    state: z.string(),
                    country: z.string(),
                })
                .or(z.array(z.any())),

            location: z.string(),
            banner: z.number(),
            icon: z.string().or(z.number()),
            gravatar: z.number(),
            enable_tnc: z.string(),
            store_tnc: z.string(),
            show_min_order_discount: z.string(),
            store_seo: z.array(z.unknown()),
            dokan_store_time_enabled: z.string(),
            dokan_store_open_notice: z.string(),
            dokan_store_close_notice: z.string(),
            dokan_store_time: z.array(z.unknown()).optional(),
            sale_only_here: z.boolean().optional(),
            company_name: z.string().optional(),
            vat_number: z.string().optional(),
            company_id_number: z.string().optional(),
            bank_name: z.string().optional(),
            bank_iban: z.string().optional(),
            profile_completion: z
                .object({
                    closed_by_user: z.boolean(),
                    phone: z.number(),
                    store_name: z.number(),
                    address: z.number(),
                    progress: z.number(),
                    next_todo: z.string(),
                    progress_vals: z.object({
                        banner_val: z.number(),
                        profile_picture_val: z.number(),
                        store_name_val: z.number(),
                        address_val: z.number(),
                        phone_val: z.number(),
                        map_val: z.number(),
                        payment_method_val: z.number(),
                        social_val: z.object({
                            fb: z.number(),
                            twitter: z.number(),
                            youtube: z.number(),
                            linkedin: z.number(),
                        }),
                    }),
                })
                .optional(),
            current_subscription: z
                .object({
                    name: z.union([z.string(), z.number()]),
                    label: z.string(),
                })
                .optional(),
            assigned_subscription: z.number().optional(),
            assigned_subscription_info: z
                .object({
                    subscription_id: z.number(),
                    has_subscription: z.boolean(),
                    expiry_date: z.string(),
                    published_products: z.number(),
                    remaining_products: z.number(),
                    recurring: z.boolean(),
                    start_date: z.string(),
                })
                .optional(),
            categories: z
                .array(
                    z.object({
                        term_id: z.number(),
                        name: z.string(),
                        slug: z.string(),
                        term_group: z.number(),
                        term_taxonomy_id: z.number(),
                        taxonomy: z.string(),
                        description: z.string(),
                        parent: z.number(),
                        count: z.number(),
                        filter: z.string(),
                    }),
                )
                .optional(),
        }),

        // sale report schema
        salesReportSchema: z.array(
            z.object({
                post_date: z.string(),
                total_sales: z.number(),
                total_orders: z.number(),
                total_earnings: z.number(),
                total_products: z.number(),
            }),
        ),

        // product report summary schema
        productReportsSummarySchema: z.object({
            publish: z.number(),
            future: z.number(),
            draft: z.number(),
            pending: z.number(),
            private: z.number(),
            trash: z.number(),
            'auto-draft': z.number(),
            inherit: z.number(),
            'request-pending': z.number(),
            'request-confirmed': z.number(),
            'request-failed': z.number(),
            'request-completed': z.number(),
            'wc-active': z.number().optional(),
            'wc-switched': z.number().optional(),
            'wc-expired': z.number().optional(),
            'wc-pending-cancel': z.number().optional(),
            'wc-pending': z.number(),
            'wc-processing': z.number(),
            'wc-on-hold': z.number(),
            'wc-completed': z.number(),
            'wc-cancelled': z.number(),
            'wc-refunded': z.number(),
            'wc-failed': z.number(),
            'wc-checkout-draft': z.number(),
            complete: z.number().optional(),
            paid: z.number().optional(),
            confirmed: z.number().optional(),
            unpaid: z.number().optional(),
            'pending-confirmation': z.number().optional(),
            cancelled: z.number().optional(),
            'in-cart': z.number().optional(),
            'was-in-cart': z.number().optional(),
            vacation: z.number().optional(),
            open: z.number().optional(),
            closed: z.number().optional(),
            total: z.number(),
        }),

        // order report summary schema
        orderReportsSummarySchema: z.object({
            total: z.number(),
            'wc-pending': z.number(),
            'wc-processing': z.number(),
            'wc-on-hold': z.number(),
            'wc-completed': z.number(),
            'wc-cancelled': z.number(),
            'wc-refunded': z.number(),
            'wc-failed': z.number(),
            'wc-checkout-draft': z.number(),
        }),

        // store preferences schema
        storePreferencesSchema: z.object({
            currency: z.string(),
            currency_position: z.string(),
            currency_symbol: z.string(),
            decimal_separator: z.string(),
            thousand_separator: z.string(),
            decimal_point: z.number(),
            tax_calculation: z.string(),
            tax_display_cart: z.string(),
            tax_round_at_subtotal: z.string(),
            coupon_enabled: z.string(),
            coupon_compound: z.string(),
            weight_unit: z.string(),
            dimension_unit: z.string(),
            product_reviews: z.string(),
            product_ratings: z.string(),
            stock_management: z.string(),
            timezone: z.string(),
            date_format: z.string(),
            time_format: z.string(),
            language: z.string(),
        }),

        // profile progress bar schema
        profileProgressBarSchema: z.object({
            progress: z.number(),
            next_todo: z.string(),
            next_todo_slug: z.string(),
            next_progress_text: z.string(),
            progress_vals: z.number(),
            progresses: z.array(
                z.object({
                    key: z.string(),
                    title: z.string(),
                    slug: z.string(),
                    value: z.number(),
                    completed: z.number(),
                }),
            ),
            closed_by_user: z.boolean(),
        }),
    },

    vendorStaffSchema: {
        vendorStaffSchema: vendorStaffSchema,
        vendorStaffsSchema: z.array(vendorStaffSchema),

        staffCapabilitiesSchema: z.object({
            all: z.object({
                overview: z.object({
                    dokan_view_sales_overview: z.string(),
                    dokan_view_sales_report_chart: z.string(),
                    dokan_view_announcement: z.string(),
                    dokan_view_order_report: z.string(),
                    dokan_view_review_reports: z.string(),
                    dokan_view_product_status_report: z.string(),
                }),
                report: z.object({
                    dokan_view_overview_report: z.string(),
                    dokan_view_daily_sale_report: z.string(),
                    dokan_view_top_selling_report: z.string(),
                    dokan_view_top_earning_report: z.string(),
                    dokan_view_statement_report: z.string(),
                }),
                order: z.object({
                    dokan_view_order: z.string(),
                    dokan_manage_order: z.string(),
                    dokan_manage_order_note: z.string(),
                    dokan_manage_refund: z.string(),
                    dokan_export_order: z.string(),
                }),
                coupon: z.object({
                    dokan_add_coupon: z.string(),
                    dokan_edit_coupon: z.string(),
                    dokan_delete_coupon: z.string(),
                }),
                review: z.object({
                    dokan_view_reviews: z.string(),
                    dokan_manage_reviews: z.string(),
                }),
                withdraw: z.object({
                    dokan_manage_withdraw: z.string(),
                }),
                product: z.object({
                    dokan_add_product: z.string(),
                    dokan_edit_product: z.string(),
                    dokan_delete_product: z.string(),
                    dokan_view_product: z.string(),
                    dokan_duplicate_product: z.string(),
                    dokan_import_product: z.string(),
                    dokan_export_product: z.string(),
                }),
                menu: z.object({
                    dokan_view_overview_menu: z.string(),
                    dokan_view_product_menu: z.string(),
                    dokan_view_order_menu: z.string(),
                    dokan_view_coupon_menu: z.string(),
                    dokan_view_report_menu: z.string(),
                    dokan_view_review_menu: z.string(),
                    dokan_view_withdraw_menu: z.string(),
                    dokan_view_store_settings_menu: z.string(),
                    dokan_view_store_payment_menu: z.string(),
                    dokan_view_store_shipping_menu: z.string(),
                    dokan_view_store_social_menu: z.string(),
                    dokan_view_store_seo_menu: z.string(),
                    dokan_view_booking_menu: z.string(),
                    dokan_view_tools_menu: z.string(),
                    dokan_view_store_verification_menu: z.string(),
                    dokan_view_auction_menu: z.string(),
                }),
                booking: z.object({
                    dokan_manage_booking_products: z.string(),
                    dokan_manage_booking_calendar: z.string(),
                    dokan_manage_bookings: z.string(),
                    dokan_manage_booking_resource: z.string(),
                    dokan_add_booking_product: z.string(),
                    dokan_edit_booking_product: z.string(),
                    dokan_delete_booking_product: z.string(),
                }),
                store_support: z.object({
                    dokan_manage_support_tickets: z.string(),
                }),
                auction: z.object({
                    dokan_add_auction_product: z.string(),
                    dokan_edit_auction_product: z.string(),
                    dokan_delete_auction_product: z.string(),
                }),
            }),
            default: z.array(z.string()),
        }),

        staffCapabilities: verndorStaffCapabilitiesSchema,
    },

    wholesaleCustomersSchema: {
        wholesaleCustomerSchema: wholesaleCustomerSchema,
        wholesaleCustomersSchema: z.array(wholesaleCustomerSchema),
        updateWholesaleCustomerSchema: customerSchema,
    },

    withdrawsSchema: {
        withdrawPaymentMethod: z.array(paymentMethodSchema),

        // getBalanceDetailsSchema
        getBalanceDetailsSchema: z.object({
            current_balance: z.number(),
            withdraw_limit: z.string(),
            withdraw_threshold: z.number(),
            withdraw_methods: z.array(z.string()),
            last_withdraw: z
                .array(
                    z.object({
                        id: z.string(),
                        user_id: z.string(),
                        amount: z.string(),
                        date: z.string(),
                        status: z.string(),
                        method: z.string(),
                        note: z.string(),
                        details: z.string(),
                        ip: z.string(),
                    }),
                )
                .optional(),
        }),
        withdrawSchema: whithdrawSchema,
        withdrawsSchema: z.array(whithdrawSchema),

        batchUpdateWithdrawsSchema: z.object({
            success: z.array(z.unknown()).optional(),
            failed: z.array(z.unknown()).optional(),
            approved: z.array(z.unknown()).optional(),
        }),

        withdrawChargesSchema: z.object({
            paypal: chargeDataSchema.optional(),
            bank: chargeDataSchema.optional(),
            skrill: chargeDataSchema.optional(),
            dokan_custom: chargeDataSchema.optional(),
            'dokan-stripe-connect': chargeDataSchema.optional(),
        }),

        chargeDetailsSchema: z.object({
            charge: z.number(),
            receivable: z.number(),
            charge_data: chargeDataSchema,
        }),
    },

    withdrawSettingsSchema: {
        withdrawSettingsSchema: z.object({
            withdraw_method: z.enum(['paypal', 'bank', 'skrill', 'dokan_custom']),
            payment_methods: z.array(
                z.object({
                    label: z.string(),
                    value: z.string(),
                }),
            ),
        }),

        withdrawSummarySchema: z.object({
            total: z.number(),
            pending: z.number(),
            approved: z.number(),
            cancelled: z.number(),
        }),

        withdrawDisbursementSettingsSchema: z.object({
            enabled: z.boolean(),
            selected_schedule: z.enum(['quarterly', 'monthly', 'biweekly', 'weekly']),
            minimum_amount_list: z.array(z.number()),
            minimum_amount_selected: z.number(),
            reserve_balance_list: z.array(z.number()),
            reserve_balance_selected: z.number(),
            default_method: z.enum(['paypal', 'bank', 'skrill', 'dokan_custom']),
            schedules: z.record(
                z.object({
                    next: z.string(),
                    title: z.string(),
                    description: z.string(),
                }),
            ),
            active_methods: z.array(z.string()),
            method_additional_info: z.array(z.enum(['paypal', 'bank', 'skrill', 'dokan_custom'])),
            minimum_amount_needed: z.number(),
            is_schedule_selected: z.boolean(),
        }),

        updateWithdrawDisbursementSettingsSchema: z.object({
            success: z.boolean(),
        }),

        disableWithdrawDisbursementSettingsSchema: z.object({
            success: z.boolean(),
        }),
    },

    productQaSchema: {
        productQuestionSchema: productQuestionSchema,
        productQuestionsSchema: z.array(productQuestionSchema),

        batchUpdateProductQuestionsSchema: z.object({
            message: z.string(),
        }),

        productQuestionAnswerSchema: productQuestionAnswerSchema,
        productQuestionAnswersSchema: z.array(productQuestionAnswerSchema),
    },

    vendorVerificationSchema: {
        verificationMethodSchema: verificationMethodSchema,
        verificationMethodsSchema: z.array(verificationMethodSchema),
        verificationRequestSchema: verificationRequestSchema,
        verificationRequestsSchema: z.array(verificationRequestSchema),
    },

    commission: z.number(),
};
