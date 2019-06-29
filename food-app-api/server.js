'use strict'

const app = require('../food-app-api/bin/express');
const variables = require('../food-app-api/bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicializada na porta ${variables.Api.port}.`)
})