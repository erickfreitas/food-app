require('../models/category-model');
const mongoose = require('mongoose');
const categoryModel = mongoose.model('category');

class categoryRepository{
    constructor(){

    }

    async getAll(){
        return await categoryModel.find();
    }

    async getById(id){
        return await categoryModel.findById(id);
    }

    async create(data){
        let category = new categoryModel(data);
        return await category.save();
    }

    async update(id, data){
        let category = categoryModel.findByIdAndUpdate(id, { $set: data });
        return await categoryModel.findById(id);
    }

    async delete(id){
        return await categoryModel.findByIdAndRemove(id);
    }
}

module.exports = categoryRepository;