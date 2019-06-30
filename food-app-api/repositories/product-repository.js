require('../models/product-model');
const mongoose = require('mongoose');
const productModel = mongoose.model('product');

class productRepository{
    constructor(){

    }

    async getAll(){
        return await productModel.find();
    }

    async getById(id){
        return await productModel.findById(id);
    }

    async create(data){
        let product = new productModel(data);
        return await product.save();
    }

    async update(id, data){
        let product = productModel.findByIdAndUpdate(id, { $set: data });
        return await productModel.findById(id);
    }

    async delete(id){
        return await productModel.findByIdAndRemove(id);
    }
}

module.exports = productRepository;