<?php

namespace Commission;

use WeDevs\Dokan\Commission\CommissionContext;
use WeDevs\Dokan\Commission\Strategies\GlobalCommissionSourceStrategy;
use WeDevs\Dokan\Commission\Strategies\OrderItemCommissionSourceStrategy;
use WeDevs\Dokan\Commission\Strategies\ProductCommissionSourceStrategy;
use WeDevs\Dokan\Commission\Strategies\VendorCommissionSourceStrategy;
use WeDevs\Dokan\ProductCategory\Helper;
use WP_UnitTestCase;

class CommissionTest extends WP_UnitTestCase {

    /**
     * Set up
     *
     * @return void
     */
    public function set_up() {
        parent::set_up();

        $categories = [
            'Category 1',
            'Category 2',
            'Category 3',
            'Category 4',
            'Category 5',
            'Category 6',
            'Category 7',
            'Category 8',
            'Category 9',
            'Category 10',
        ];

        foreach ( $categories as $category_name ) {
            if ( ! term_exists( $category_name, 'product_cat' ) ) {
                wp_insert_term(
                    $category_name, // the term
                    'product_cat',  // the taxonomy
                    [
                        'description' => 'Description for ' . $category_name,
                        'slug'        => sanitize_title( $category_name ),
                    ]
                );
            }
        }
    }

    public function test_that_we_can_get_commission_with_non_existed_product_and_vendor() {
        $orderItemId = 1; // Example IDs
        $productId   = 103;
        $vendorId    = 2;
        $category_id = 15;     // Example cat

        $strategies = [
            new OrderItemCommissionSourceStrategy( $orderItemId ),
            new ProductCommissionSourceStrategy( $productId ),
            new VendorCommissionSourceStrategy( $vendorId, $category_id ),
            new GlobalCommissionSourceStrategy( $category_id ),
        ];

        $context      = new CommissionContext( $strategies );
        $productPrice = 100.00; // Example product price
        $commission   = $context->calculate_commission( $productPrice );

        $this->assertTrue( is_a( $commission, 'WeDevs\Dokan\Commission\Utils\CommissionData' ) );
        $this->assertIsArray( $commission->get_data() );
        $this->assertEquals( 'none', $commission->get_source() );
        $this->assertEquals( 0, $commission->get_per_item_admin_commission() );
        $this->assertEquals( 0, $commission->get_admin_commission() );
        $this->assertEquals( $productPrice, $commission->get_vendor_earning() );
        $this->assertEquals( 1, $commission->get_total_quantity() );
        $this->assertEquals( $productPrice, $commission->get_total_amount() );
        $this->assertEquals( 'none', $commission->get_type() );
        $this->assertEquals( [], $commission->get_parameters() );
    }

    public function test_fixed_commission_calculation_works_properly_for_smaller_amount_then_commission_amount_in_global() {
        $commission_global_options = [
            "shipping_fee_recipient"           => "admin",
            "tax_fee_recipient"                => "admin",
            "shipping_tax_fee_recipient"       => "admin",
            "new_seller_enable_selling"        => "on",
            "commission_type"                  => "fixed",
            "admin_percentage"                 => "5",
            "additional_fee"                   => "5",
            "order_status_change"              => "on",
            "commission_category_based_values" => [
                "all"   => [
                    "flat"       => "",
                    "percentage" => "",
                ],
                "items" => [
                    17 => [
                        "flat"       => "5",
                        "percentage" => "10",
                    ],
                ],
            ],
        ];
        update_option( 'dokan_selling', $commission_global_options );

        $vendor = dokan()->vendor->create(
            [
                'user_login' => 'custom-vendor-' . rand(),
            ],
        );
        wp_set_current_user( $vendor->get_id() );

        $product = dokan()->product->create(
            [
                'name'          => 'custom_product_' . rand(),
                'regular_price' => 2,
                'categories'    => [ 15 ],
            ]
        );

        dokan_override_product_author( $product, $vendor->get_id() );

        $chosen_cat = Helper::get_saved_products_category( $product->get_id() )['chosen_cat'];
        Helper::generate_and_set_chosen_categories( $product->get_id(), $chosen_cat );

        $vendor_earning   = dokan()->commission->get_earning_by_product( $product, 'seller' );
        $admin_commission = dokan()->commission->get_earning_by_product( $product, 'admin' );

        $this->assertEquals( 0, $vendor_earning );
        $this->assertEquals( 2, $admin_commission );
    }

    public function test_that_we_can_get_the_legacy_commission_types() {
        $this->assertTrue( method_exists( dokan()->commission, 'get_legacy_commission_types' ) );

        $legacy_commission_types = dokan()->commission->get_legacy_commission_types();

        $this->assertSame(
            array_keys( $legacy_commission_types ),
            [
                'combine',
                'percentage',
                'flat',
            ]
        );
    }
}