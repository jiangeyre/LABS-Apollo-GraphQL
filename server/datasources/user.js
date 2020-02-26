const { DataSource } = require("apollo-datasource");

class UserAPI extends DataSource {
    constructor({ store }) {
        super()
        this.store = store
    }

    initialize(config) {
        this.context = config.context
    }

    async getUsers() {
        const users = this.store.users
        return users
    }

    async getUser({ email: emailArg }) {
        let index = 0;

        const email = this.context && this.context.user ?
        this.context.user.email : emailArg;

        const theUser = this.store.users.map(user => {
            if (email === user.email) {
                index = this.store.users.indexOf(user)
                return user
            }
        })
        return theUser[index];
    }
}

module.exports = UserAPI;