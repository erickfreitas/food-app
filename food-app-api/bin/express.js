const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');

//Rotas
const categoryRouter = require('../routes/category-router');
const productRouter = require('../routes/product-router');
const userRouter = require('../routes/user-router');

//Invocando Api Express
const app = express();

//Configurando o parse do body para Json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

//Configurando a conexão com MongoDb
mongoose.connect(variables.Database.connection, { useNewUrlParser: true});

app.use('/api/categories', categoryRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

//Exportando Api
module.exports = app;