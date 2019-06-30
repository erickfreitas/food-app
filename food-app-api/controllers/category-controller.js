'user strict'

require('../models/category-model');
const mongoose = require('mongoose');
const categoryModel = mongoose.model('category');


function categoryController(){

}

categoryController.prototype.get = async (req, res) => {
    res.status(200).send(await categoryModel.find());
};

categoryController.prototype.getById = async (req, res) => {
    res.status(200).send(await categoryModel.findById(req.params.id));
};

categoryController.prototype.post = async (req, res) => {
    let category = new categoryModel(req.body);
    res.status(200).send(await category.save());
};

categoryController.prototype.put = async (req, res) => {
    let category = categoryModel.findByIdAndUpdate(req.params.id, { $set: req.body });
    res.status(200).send(await categoryModel.findById(req.params.id));
};

categoryController.prototype.delete = async (req, res) => {
    res.status(200).send(await categoryModel.findByIdAndRemove(req.params.id));
};

module.exports =  categoryController;