'use strict'

const mongoose = require('mongoose');

class repositoryBase{
    constructor(model){
        this._model = mongoose.model(model);
    }

    async getAll(){
        return await this._model.find();
    }

    async getById(id){
        return await this._model.findById(id);
    }

    async create(data){
        let model = new this._model(data);
        return await model.save();
    }

    async update(id, data){
        let model = this._model.findByIdAndUpdate(id, { $set: data });
        return await model.findById(id);
    }

    async delete(id){
        return await this._model.findByIdAndRemove(id);
    }
}

module.exports = repositoryBase;