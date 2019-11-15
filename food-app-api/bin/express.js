const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');
var cors = require('cors');

//Rotas
const categoryRouter = require('../routes/category-router');
const productRouter = require('../routes/product-router');
const userRouter = require('../routes/user-router');
const orderRouter = require('../routes/order-router');

//Invocando Api Express
const app = express();

app.use(cors());

//Configurando o parse do body para Json
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extend: false, extended: false }));

//Configurando a conexão com MongoDb
mongoose.connect(variables.Database.connection, { useNewUrlParser: true, useCreateIndex: true});

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

//Exportando Api
module.exports = app;