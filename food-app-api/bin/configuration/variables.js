const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection : process.env.connection || 'mongodb+srv://foodapp:foodapp@cluster0-kek1d.mongodb.net/test?retryWrites=true&w=majority'
    },
    Security: {
        secretKey: '53DD6AE47CF6490F1D0D5C629840EEDF6102967340CDB5AFAC3F9582698170E6'
    }
}

module.exports = variables;