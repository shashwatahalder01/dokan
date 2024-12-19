# Dokan Test Environment Setup

This guide outlines the steps to set up a test environment for Dokan, including setting up a local WordPress site with necessary plugins and configuring the environment for running tests. The process ensures a clean and consistent testing setup.

## Overview

The following tasks will be covered:

1. Downloading and configuring WordPress.
2. Installing necessary themes and plugins.
3. Configuring Dokan settings and modules.
4. Adding users and setting up authentication.
5. Configuring WooCommerce settings.
6. Setting up Dokan-specific settings and features.

### Detailed Task List

- **Setup Local Site**

    - Download WordPress
    - Create config
    - Create database
    - Install WordPress
    - Install theme

- **Setup Dokan Test Site**

    - Install plugin (WooCommerce)
    - Install plugin (Dokan Lite)
    - Install plugin (Dokan Pro)
    - Install plugin (Basic Auth)
    - Install plugin (WooCommerce Product Addons)
    - Install plugin (WooCommerce Subscriptions)
    - Install plugin (WooCommerce Simple Auctions)
    - Install plugin (WooCommerce Booking)
    - Checkout Dokan Pro to the develop branch

- **Site Setup**

    - Set WP debug config
    - Set permalink (post_name)
    - Activate theme (Storefront)
    - Get server URL
    - Activate Basic Auth
    - Activate WooCommerce
    - Activate Dokan Lite
    - Activate Dokan Pro
    - Set Dokan license
    - Activate all Dokan modules
    - Set site general settings
    - Get test environment info

- **Add & Authenticate Users**

    - Authenticate admin
    - Enable admin selling status
    - Add customer and vendor accounts
    - Authenticate users

- **WooCommerce Settings**

    - Configure tax rates, shipping zones, payment methods
    - Add product categories, attributes, and tags
    - Disable WooCommerce task list reminder and product tours

- **Dokan Settings**

    - General, selling, and withdrawal settings
    - Page, appearance, and privacy policy settings
    - Module-specific settings (e.g., Live Chat, RMA, Wholesale)

- **User Settings**
    - Add vendor products and coupons

## Prerequisites

1. Node.js and npm installed.
2. Git installed and configured.
3. Local server (e.g., XAMPP, Valet Local by Flywheel, etc.).

## Steps to Setup Test Environment

### Clone the Dokan Lite Repository

```bash
git clone https://github.com/getdokan/dokan.git
```

### Navigate to the Tests Directory

```bash
cd dokan-lite/tests/pw
```

### Install Dependencies

```bash
npm install
```

### Site Reset (Optional)

To reset the database and ensure a clean start:

```bash
npm run site:reset
```

### Setup Environment (Without Reset)

This updates necessary settings to their default values without resetting the site:

```bash
npm run site:setup
```

### Local Site Setup

To create a local site with all required plugins:

```bash
npm run local:setup
```

To allow Dokan specific setup run :
```bash
SKIP_DOKAN=false npm run local:setup
```

### Required .env File

Create a .env file in the project root and add the following configuration:

```bash
BASE_URL=https://example.com                                                    [Base URL of the test site]
SITE_PATH=/users/rk/sites/dokan                                                 [Path of the local test site][only for local testing]

# Database Configuration                
DB_HOST_NAME=localhost                                                          [Database server hostname or IP address]
DB_USER_NAME=dbuser                                                             [Database username]
DB_USER_PASSWORD=dbpassword                                                     [Database user password]
DATABASE=mywpdb                                                                 [Database name]
DB_PORT=3306                                                                    [Database connection port]
DB_PREFIX=wp                                                                    [Prefix for database tables]
```


## Notes

- Ensure the database and server are configured properly before running any scripts.

This setup ensures that your environment is consistent and ready for running end-to-end tests for Dokan and its associated plugins.
