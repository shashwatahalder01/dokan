const { loginUser, createUser, } = require("@wordpress/e2e-test-utils")
const base = require("../pages/base.js")
const selector = require("../pages/selectors.js")

module.exports = {

    // user login
    async login(username, password) {
        await this.loginFrontend(username, password)
        // await this.loginBackend(username, password)
    },

    //login from frontend
    async loginFrontend(username, password) {
        await base.goIfNotThere("my-account")
        let emailField = await base.isVisible(selector.frontend.username)
        if (emailField) {
            await base.clearAndType(selector.frontend.username, username)
            await base.clearAndType(selector.frontend.userPassword, password)
            await base.clickAndWait(selector.frontend.logIn)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //login user form WP login dashboard
    async loginBackend(username, password) {
        await base.goIfNotThere("wp-login.php")
        let emailField = await base.isVisible(selector.backend.email)
        if (emailField) {
            await base.clearAndType(selector.backend.email, username)
            await base.clearAndType(selector.backend.password, password)
            await base.clickAndWait(selector.backend.login)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //admin login
    async adminLogin(username, password) {
        await base.goIfNotThere("wp-admin")
        let emailField = await base.isVisible(selector.backend.email)
        if (emailField) {
            await base.clearAndType(selector.backend.email, username)
            await base.clearAndType(selector.backend.password, password)
            await base.clickAndWait(selector.backend.login)

            let loggedInUser = await base.getCurrentUser()
            expect(loggedInUser).toBe(username)
        }
    },

    //switcher user
    async switchUser(username, password) {
        let currentUser = await base.getCurrentUser()
        if (currentUser !== username) {
            await this.loginBackend(username, password)
        }
    },

    //create user
    async createUser(username, userDetails) {
        let password = createUser(username, userDetails)
        return password
    },

    async checkUserExists(username, password) {
        await base.goIfNotThere("wp-login.php")
        let emailField = await base.isVisible(selector.backend.email)
        if (emailField) {
            await base.clearAndType(selector.backend.email, username)
            await base.clearAndType(selector.backend.password, password)
            await base.clickAndWait(selector.backend.login)
        }

        let loginError = await base.isVisible(selector.backend.loginError)
        if (loginError) {
            let errorMessage = await base.getElementText(selector.backend.loginError)
            expect(errorMessage).toMatch(`Error: The username ${username} is not registered on this site. If you are unsure of your username, try your email address instead.`)
            return false
        }
        return true
    }

}