const variables = {
    Api: {
        port: process.env.port || 3000
    },
    Database: {
        connection : process.env.connection || 'mongodb+srv://foodapp:C4r0BQz882isvRVu@cluster0-kek1d.mongodb.net/food-app?retryWrites=true&w=majority'
        //connection : process.env.connection || 'mongodb://appuser:pass123@localhost:27017/foodapp'
    },
    Security: {
        secretKey: '53DD6AE47CF6490F1D0D5C629840EEDF6102967340CDB5AFAC3F9582698170E6'
    }
}

module.exports = variables;