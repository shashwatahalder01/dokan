<!-- prettier-ignore -->
### Todo: E2E-API TaskList

-   [ ] Project: add more comments for code readability
-   [ ] Project: add JSDOC
-   [ ] Project: add parallelism for both git action & playwright tests
-   [ ] Project: GRAB CONSOLE ERROR, And PHP ERROR
-   [ ] TestData: update all image path from project root
-   [ ] Zip_suite: add zip testing tests
-   [ ] Selectors: add html tag to every css locator e.g. #id to input#id
-   [ ] Selectors: shorten selector is all pages e.g. adminSettings = selector.admin.dokan.settings;
-   [ ] Reporter: add os and browsers in env info
-   [ ] Reporter: convert testSummary from commonjs module to es-module
-   [ ] Readme: add readme contribute to e2e_api project
-   [ ] Readme: rephrase readme
-   [ ] Readme: fix bookmark issue
-   [ ] Readme: update readme following readme guideline
-   [ ] E2E_Suite: List all core tests and setup tests : plugins activated, wp settings, woocommerce settings, dokan modules activated , dokan settings for both e2e and api
-   [ ] E2E_Suite: Slack integration
-   [ ] E2E_Suite: Working-directory: ./path/to/tests
-   [ ] E2E_Suite: Update auth if expired instead of every-time
-   [ ] E2E_Suite: Report: separate two junit report showing on simple git-action summary
-   [ ] E2E_Suite: Global setup & teardown can be converted to project setup: no need
-   [ ] E2E_Suite: Project Configuration: separate everything for local & CI like: global setup, env, playwright config, Configure projects for multiple environments : ci, local,
-   [ ] E2E_Suite: Fixture: add fixture: separate user role, implement fixture for lite pro issue handle
-   [ ] E2E_Suite: Test basic auth can be used instead of cookies for authentication , no need to do this
-   [ ] E2E_Suite: why two pages are opening : fix that
-   [ ] E2E_Suite: Modal: Close modal if exists, causes issue with other tests where popup blocks next step**\***
-   [ ] E2E_Suite: add new tests or multiple entry in same test for all search parameter, i.e : by-customer, by-product, but-store,..
-   [ ] E2E_Suite: insert all date format according to site format , currently hardcoded to default format -> helpers.dateFormatFYJ
-   [ ] E2E_Suite: try to fix product advertisement product, reverse withdraw product, store map save via api, currently e2e is used
-   [ ] E2E_Suite:
// todo: Convert yml step to nodejs script for local development
// todo: Update goIfNotThere method usages: previous action add some changes but doesn't get reflected due to goIfNotThere
// todo: HANDLE ERROR: throw new Error('Badge is already published'); : either throw error or just return or convert to playwright error
// todo: Add modal or sub option to all explotory tesing
// todo: Add wait for multiple different response on base-page
// todo: Clear data in beforeAll where necessary









-   [ ] E2E_Suite: \*\*\* need custom check method
-   [ ] E2E_Suite: add all email tests
-   [ ] E2E_Suite: short browser context load in spec file
-   [ ] E2E_Suite: use global variable instead of env variable
-   [ ] E2E_Suite: todo: commission tests
-   [ ] E2E_Suite: todo: add multi store category tests
-   [ ] E2E_Suite: todo: move to other files: product categories
-   [ ] E2E_Suite: todo: add multistep product categories test
-   [ ] E2E_Suite: todo: add product categories settings test
-   [ ] E2E_Suite: todo: add individual withdraw settings test
-   [ ] E2E_Suite: todo: add separate files for catalog mode add new tests
-   [ ] E2E_Suite: todo: add separate files for terms and conditions and add new tests
-   [ ] E2E_Suite: todo: add multivendor payloads, and update create order for multivendor
-   [ ] E2E_Suite: todo: add round option for helper methods
-   [ ] API_Suite: make api suite independent, import: => like dokan pro exists or not, test summary, env setup from e2e suite
-   [ ] API_Suite: add reverse withdraw and product advertisement on setup tests
-   [ ] API_Suite: convert admin as vendor to vendor for whole suite
-   [ ] API_Suite: fix rank math api
-   [ ] API_Suite: update payloads which causes any php warning [create dokan issue where necessary]
-   [ ] API_Suite: update all tests with product-id, customer-id, to make it faster
-   [ ] API_Suite: hardcoding admin auth will hinder negative testing : test with invalid user
-   [ ] API_Suite: Payload generator\*\*

### In Progress

### Done ✓
