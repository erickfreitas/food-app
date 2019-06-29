const express = require('express');
const bodyParser = require('body-parser');

//Rotas
const categoryRouter = require('../routes/category-router');
const productRouter = require('../routes/product-router');

//Invocando Api Express
const app = express();

//Configurando o parse do body para Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);

//Exportando Api
module.exports = app;