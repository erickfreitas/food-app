const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection : process.env.connection || 'mongodb+srv://foodapp:foodapp@cluster0-kek1d.mongodb.net/test?retryWrites=true&w=majority'
    }
}

module.exports = variables;