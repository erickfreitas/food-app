'use strict'

const app = require('./bin/express');
const variables = require('./bin/configuration/variables');

app.listen(variables.Api.port, () => {
    console.info(`Api inicializada na porta ${variables.Api.port}.`)
})