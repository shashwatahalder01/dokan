const { faker } = require('@faker-js/faker')
const { isThemeInstalled } = require('@wordpress/e2e-test-utils')
const helpers = require("./helpers.js")



module.exports = {

   //--------------------------------------------------- Fixed  test data ---------------------------------------------//
   // PluginSlugList: ['dokan-lite', 'dokan-pro', 'woocommerce', 'woocommerce-bookings', 'woocommerce-product-add-ons', 'woocommerce-simple-auction', 'woocommerce-subscriptions', 'elementor', 'elementor-pro',],
   PluginSlugList: ['dokan-lite', 'dokan-pro', 'woocommerce', 'woocommerce-bookings', 'woocommerce-product-add-ons', 'woocommerce-simple-auction', 'woocommerce-subscriptions',],
   // PluginSlugList: ['dokan-lite', 'dokan-pro', 'woocommerce'],


   // wooCommerce

   //shipping
   shippingMethods: ['flat_rate', 'free_shipping', 'local_pickup', 'dokan_table_rate_shipping', 'dokan_distance_rate_shipping', 'dokan_vendor_shipping'],
   taxStatus: ['taxable', 'none'],
   freeShippingRequires: ['coupon', 'min_amount', 'either', 'both'],

   //payment
   razorpayDisbursementMode: ['Immediate', 'On Order Complete', 'Delayed'],
   payPalMarketplaceDisbursementMode: ['Immediate', 'On Order Complete', 'Delayed'],
   payPalMarketplacePaymentButtonType: ['Smart Payment Buttons', 'Standard Button'],
   mangopayAvailableCreditCards: ['CB/Visa/Mastercard', 'Maestro*', 'Bancontact/Mister Cash', 'Przelewy24*', 'Diners*', 'PayLib', 'iDeal*', 'MasterPass*', 'Bankwire Direct*'],
   mangopayAvailableDirectPaymentServices: ['Sofort*', 'Giropay*'],
   mangopayTransferFunds: ['On payment completed', 'On order completed', 'Delayed'],
   mangopayTypeOfVendors: ['Individuals', 'Business', 'Either'],
   mangopayBusinessRequirement: ['Organizations', 'Soletraders', 'Businesses', 'Any'],
   stripeExpressDisbursementMode: ['On payment completed', 'On order completed', 'Delayed'],
   stripeExpressPaymentMethods: ['Credit/Debit Card', 'iDEAL'],
   stripeExpressButtonType: ['default', 'buy', 'donate', 'book'],
   stripeExpressButtonTheme: ['dark', 'light', 'light-outline'],
   stripeExpressButtonLocations: ['Checkout', 'Product', 'Cart'],
   stripeExpressButtonSize: ['default', 'medium', 'large'],

   //Dokan

   //setup wizard
   setupWizardShippingFeeRecipient: ['Vendor', 'Admin'],
   setupWizardTaxFeeRecipient: ['Vendor', 'Admin'],
   setupWizardMapApiSource: ['Google Maps', 'Mapbox'],
   setupWizardSellingProductTypes: ['Physical','Digital','Both'],
   setupWizardCommissionType: ['Flat', 'Percentage', 'Combine'],

   //admin
   //general settings
   sellingProductTypes: ['sell_both', 'sell_physical', 'sell_digital'],
   storeCategory: ['none', 'Single', 'Multiple'],

   //selling options settings
   commissionType: ['flat', 'percentage', 'combine'],
   shippingFeeRecipient: ['seller', 'admin'],
   taxFeeRecipient: ['seller', 'admin'],
   newProductStatus: ['publish', 'pending'],
   productCategory: ['single', 'multiple'],

   //withdraw
   quarterlyScheduleMonth: ['january', 'february', 'march'],
   quarterlyScheduleWeek: ['1', '2', '3', 'L'],
   quarterlyScheduleDay: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   monthlyScheduleWeek: ['1', '2', '3', 'L'],
   monthlyScheduleDay: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   biweeklyScheduleWeek: ['1', '2'],
   biweeklyScheduleDay: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
   weeklyScheduleDay: ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],

   //privacy policy settings
   privacyPolicy: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],

   //getSupport settings
   displayOnSingleProductPage: ['above_tab', 'inside_tab', 'dont_show'],

   //rma settings
   rmaOrderStatus: ['wc-pending', 'wc-processing', 'wc-on-hold', 'wc-completed', 'wc-cancelled', 'wc-refunded', 'wc-failed'],
   enableRefundRequests: ['yes', 'no'],
   enableCouponRequests: ['yes', 'no'],

   //wholesale customer settings
   needApprovalForCustomer: ['yes', 'no'],

   //delivery time settings
   storeOpeningClosingTime: ['12:00 AM', '11:30 PM'], //TODO: has more elements -> generate using function

   //geolocation settings
   locationMapPosition: ['top', 'left', 'right'],
   showMap: ['all', 'store_listing', 'shop'],
   radiusSearchUnit: ['km', 'miles'],

   //spmv settings
   availableVendorSectionDisplayPosition: ['below_tabs', 'inside_tabs', 'after_tabs'],
   showSpmvProducts: ['show_all', 'min_price', 'max_price', 'top_rated_vendor'],

   //vendor subscription settings
   subscription: ['2', '4', '5', '6', '8', '9', '10', '11', '15', '-1'],
   productStatus: ['publish', 'pending', 'draft'],

   // products
   productTypes: ['simple', 'grouped', 'external', 'variable', 'product_pack', 'subscription', 'variable-subscription', 'booking', 'auction'],
   productTaxStatus: ['taxable', 'shipping', 'none'],
   productTaxClass: ['taxable', 'reduced-rate', 'zero-rate'],
   subscriptionExpire: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'],
   subscriptionPeriodInterval: ['0', '1', '2', '3', '4', '5', '6'],
   subscriptionPeriod: ['day', 'week', 'month', 'year'],
   subscriptionTrialPeriod: ['day', 'week', 'month', 'year'],
   auctionItemCondition: ['new', 'used'],
   auctionType: ['normal', 'reverse'],
   bookingDurationType: ['fixed', 'customer'],
   bookingDurationUnit: ['month', 'day', 'hour', 'minute'],
   calenderDisplayMode: ['', 'always_visible'],

   //vendor
   withdrawPaymentMethods: ['paypal', 'bank', 'dokan_custom', 'skrill'],
   reserveBalance: ['0', '5', '10', '15', '50', '100', '200', '300', '500', '1000', '2000', '3000', '5000', '10000'],

   orderStatus: ['wc-pending', 'wc-processing', 'wc-on-hold', 'wc-completed', 'wc-cancelled', 'wc-refunded', 'wc-failed'],

   //rma settings
   rmaType: ['no_warranty', 'included_warranty', 'addon_warranty'],
   rmaLength: ['limited', 'lifetime'],
   rmaLengthDuration: ['days', 'weeks', 'months', 'years'],

   //auction
   itemCondition: ['new', 'used'],
   actionType: ['normal', 'reverse'],

   //vendor
   //shipping policy
   shippingPolicy: ['1', '2', '3', '4', '5', '6', '7', '8', '9'], // TODO: replace with select text values
   vendorShippingMethods: ['flat_rate', 'free_shipping', 'local_pickup', 'dokan_table_rate_shipping', 'dokan_distance_rate_shipping'],
   flatRateCalculationType: ['class', 'order'],
   flatRateCalculationType: ['item', 'line', 'class'], // TODO: replace with select text values, one option missing
   tableRateTaxIncludedInShippingCosts: ['yes', 'no'],
   distanceRateTransportationMode: ['driving', 'walking', 'Bicycling'],
   distanceRateAvoid: ['none', 'tolls', 'highways', 'ferries'],
   distanceRateDistanceUnit: ['metric', 'imperial'],
   //addon
   addonType: ['multiple_choice', 'checkbox', 'custom_text', 'custom_textarea', 'file_upload', 'custom_price', 'input_multiplier', 'heading'],
   addonDisplayAs: ['select', 'radiobutton', 'images'],
   addonFormatTitle: ['label', 'heading', 'hide'],
   addonOptionPriceType: ['flat_fee', 'quantity_based', 'percentage_based'],
   //vendor store settings
   vacationClosingStyle: ['instantly', 'datewise'],

   //Stripe express
   iDealBanks: ['abn_amro', 'asn_bank', 'bunq', 'handelsbanken', 'ing', 'knab', 'rabobank', 'regiobank', 'revolut', 'sns_bank', 'triodos_bank', 'van_lanschot'],

   //bank details
   bankAccountType: ['personal', 'business'],


   //------------------------------------------------ Generated  test data ------------------------------------------------------//

   wpCustomer: {
      firstName: 'customer10005',
      lastName: 'c10005',
      role: 'customer',
   },

   customerInfo: {
      userEmail: faker.internet.email(),
      password: process.env.CUSTOMER_PASSWORD,
      password1: '02dokan02',
      // firstName: faker.name.findName(),
      firstName: faker.name.firstName('male'),
      lastName: faker.name.lastName('male'),
      userEmail: faker.internet.email(),
      companyName: faker.company.companyName(),
      companyId: faker.random.alphaNumeric(5),
      vatNumber: faker.random.alphaNumeric(10),
      bankName: faker.address.state(),
      bankIban: faker.finance.iban(),
      phone: faker.phone.phoneNumber('(###) ###-####'),
      street1: 'abc street',
      street2: 'xyz street',
      country: 'United States (US)',
      countrySelectValue: 'US',
      stateSelectValue: 'NY',
      city: 'New York',
      zipCode: '10006',
      state: 'New York',
      accountName: 'accountName',
      accountNumber: faker.random.alphaNumeric(10),
      bankName: 'bankName',
      bankAddress: 'bankAddress',
      routingNumber: faker.random.alphaNumeric(10),
      swiftCode: faker.random.alphaNumeric(10),
      iban: faker.random.alphaNumeric(10),

      getSupportSubject: 'get Support Subject',
      getSupportMessage: 'get Support Message',
   },


   vendorInfo: {
      userEmail: faker.internet.email(),
      password: process.env.VENDOR_PASSWORD,
      firstName: faker.name.firstName('male'),
      lastName: faker.name.lastName('male'),
      userName: faker.name.firstName('male'),
      shopName: faker.company.companyName(),
      // shopUrl: faker.company.companyName(),
      companyName: faker.company.companyName(),
      companyId: faker.random.alphaNumeric(5),
      vatNumber: faker.random.alphaNumeric(10),
      bankName: faker.address.state(),
      bankIban: faker.finance.iban(),
      phone: faker.phone.phoneNumber('(###) ###-####'),
      street1: 'abc street',
      street2: 'xyz street',
      country: 'United States (US)',
      countrySelectValue: 'US',
      stateSelectValue: 'NY',
      city: 'New York',
      zipCode: '10006',
      state: 'New York',
      accountName: 'accountName',
      accountNumber: faker.random.alphaNumeric(10),
      bankName: 'bankName',
      bankAddress: 'bankAddress',
      routingNumber: faker.random.alphaNumeric(10),
      swiftCode: faker.random.alphaNumeric(10),
      iban: faker.random.alphaNumeric(10),

      //shop details
      productsPerPage: '12',
      mapLocation: 'New York',
      minimumOrderAmount: '200',
      minimumOrderAmountPercentage: '10',
      minimumProductQuantity: '1',
      maximumProductQuantity: '20',
      minimumAmountToPlace: '10',
      maximumAmountToPlace: '1000000',
   },

   vendorSetupWizard: {
      storeProductsPerPage: '12',
      street1: 'abc street',
      street2: 'xyz street',
      country: 'United States (US)',
      city: 'New York',
      zipCode: '10006',
      state: 'New York',
      paypal: faker.internet.email(),
      bankAccountName: 'accountName',
      bankAccountType: faker.helpers.arrayElement(['personal', 'business']),
      bankAccountNumber: faker.random.alphaNumeric(10),
      bankName: 'bankName',
      bankAddress: 'bankAddress',
      bankRoutingNumber: faker.random.alphaNumeric(10),
      bankIban: faker.random.alphaNumeric(10),
      bankSwiftCode: faker.random.alphaNumeric(10),
      customPayment: '1234567890',
      skrill: faker.internet.email(),
   },

   product: {
      name: {
         simple: faker.commerce.productName() + (' (Simple)'),
         variable: faker.commerce.productName() + (' (Variable)'),
         external: faker.commerce.productName() + (' (External/Affiliate)'),
         grouped: faker.commerce.productName() + (' (Grouped)'),
         simpleSubscription: faker.commerce.productName() + (' (Simple Subscription)'),
         variableSubscription: faker.commerce.productName() + (' (Variable Subscription)'),
         dokanSubscription: 'Dokan Subscription ' + faker.helpers.arrayElement(['Gold', 'Silver', 'Platinum', 'Premium'],) + ' ' + faker.random.alpha({ count: 5, upcase: true },) + (' (Product Pack)'),
         booking: faker.commerce.productName() + (' (Booking)'),
         auction: faker.commerce.productName() + (' (Auction)'),
      },
      // price: faker.commerce.price(100, 200, 2),
      // price: faker.datatype.number({min:1, max:200, precision: 0.01}),
      // price: faker.finance.amount(1, 200, 2), 
      price_int: faker.finance.amount(100, 200, 0),
      price: faker.finance.amount(100, 200, faker.helpers.arrayElement([0, 2])), // 0 = no decimals, 2 = 2 decimals
      price_frac: faker.finance.amount(100, 200, faker.helpers.arrayElement([1, 2])),
      price_frac_comma: (faker.finance.amount(100, 200, faker.helpers.arrayElement([1, 2]))).replace('.', ','),
      auctionPrice: faker.commerce.price(10, 100, 0),
      category: 'Uncategorized',
      categories: faker.helpers.arrayElement(["Electronic Devices", "Electronic Accessories", "Men's Fashion", "Clothings", "Women's Fashion"]),
      attribute: 'size',
      attributeTerms: ['s', 'l', 'm'],
      vendor: [process.env.ADMIN,process.env.VENDOR, process.env.VENDOR1],
      booking: {
         productName: faker.commerce.productName() + (' (Booking)'),
         category: 'Uncategorized',
         bookingDurationType: 'fixed',
         bookingDuration: '2',
         bookingDurationUnit: 'day',
         calenderDisplayMode: 'always_visible',
         maxBookingsPerBlock: '5',
         minimumBookingWindowIntoTheFutureDate: '0',
         minimumBookingWindowIntoTheFutureDateUnit: 'month',
         maximumBookingWindowIntoTheFutureDate: '5',
         maximumBookingWindowIntoTheFutureDateUnit: 'month',
         baseCost: '20',
         blockCost: '10',
      },
      auction: {
         startDate: helpers.currentDateTime.replace(/,/g, ''),
         endDate: helpers.addDays(helpers.currentDateTime, 60).replace(/,/g, ''),
      },

      //review
      rating: faker.datatype.number({ min: 1, max: 5 }),
      reviewMessage: faker.datatype.uuid(),
      // reviewMessage: faker.lorem.word()
      // 
      //report
      // reportReason: faker.random.arrayElement(['This content is spam', 'This content should marked as adult', 'This content is abusive', 'This content is violent', 'This content suggests the author might be risk of hurting themselves', 'This content infringes upon my copyright', 'This content contains my private information', 'Other', 'This product is fake']),
      reportReason: faker.helpers.arrayElement(['This content is spam', 'This content should marked as adult', 'This content is abusive', 'This content is violent', 'This content suggests the author might be risk of hurting themselves', 'This content infringes upon my copyright', 'This content contains my private information', 'Other']),
      reportReasonDescription: 'report reason description',

      //enquiry
      enquiryDetails: 'enquiry details',
   },

   store: {
      rating: faker.helpers.arrayElement(['width: 20%', 'width: 40%', 'width: 60%', 'width: 80%', 'width: 100%']),
      storeReviewTitle: 'store review title',
      storeReviewMessage: 'store review message',

   },

   order: {
      //refund
      refundRequestType: 'refund',
      refundRequestReasons: 'defective',
      refundRequestDetails: 'I would like to return this product',
   },

   card: {
      strip: {
         striptNon3D: '4242424242424242',
         stript3D: '4000002500003155',
         expiryMonth: '12',
         expiryYear: '50',
         expiryDate: '1250',
         cvc: '111'
      },
      mangopay: {
         creditCard: '4972485830400049',
         expiryMonth: '12',
         expiryYear: '50',
         cvc: '111'
      },

   },

   paymentDetails: {
      stripExpress: {
         paymentMethod: 'card',
         cardInfo: {
            cardNumber: '4242424242424242',
            expiryMonth: '12',
            expiryYear: '50',
            expiryDate: '1250', //MMYY
            cvc: '111'
         },
      },
   },

   coupon: {
      amount: faker.datatype.number({ min: 1, max: 10 },).toString(),
      title: 'VC_' + faker.random.alpha({ count: 5, upcase: true },)
   },

   urls: {
      facebook: 'https://www.facebook.com/',
      twitter: 'https://www.twitter.com/',
      pinterest: 'https://www.pinterest.com/',
      linkedin: 'https://www.linkedin.com/',
      youtube: 'https://www.youtube.com/',
      instagram: 'https://www.instagram.com/',
      flickr: 'https://www.flickr.com/',
   },


   //------------------------------------------------ predefined  test data ------------------------------------------------------/

   simpleProduct: ['p1_v1 (simple)', 'p2_v1 (simple)', 'p1_F1_v1 (simple)', 'p2_F2_v1 (simple)'],
   variableProduct: ['p1_v1 (variable)'],
   simpleSubscription: ['p1_v1 (simple subscription)'],
   variableSubscription: ['p1_v1 (variable subscription)'],
   externalProduct: ['p1_v1 (external/affiliate)'],
   auctionProduct: ['p1_v1 (auction)'],
   bookingProduct: ['p1_v1 (booking)'],
   saleProduct: ['p1_v1 (sale)'],
   couponCode: ['C1_v1'],

   vendorStores: ['vendorStore1', 'vendorStore2'],







   // some sample data
   productsName: ["Plain Cotton Tshirt", "The moon Tshirt", "Summer Tshirt"],
   prizes: [100, 150, 250],
   tshirt: ["Plain Cotton Tshirt", "The moon Tshirt", "Summer Tshirt"],
   parentCategories: ["Electronic Devices", "Electronic Accessories", "Men's Fashion", "Clothings", "Women's Fashion"],
   productCategories: ["SmartPhones", "Laptops", "Accessories", "Shirts", "T-Shirts", "Polo Shirts", "Jeans", "Pants", "Shoes", "Bags",],
   productAttributes: ["Size", "Color"],
   attributeValues: [["S", "M", "L", "XL", "XXL"], ["Red", "Blue", "Black", "Yellow", "White", "Deep blue"],],
}

