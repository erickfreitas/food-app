require('../models/product-model');
const baseRepository = require('../bin/base/repository-base');

class productRepository{
    constructor(){
        this._baseRepository = new baseRepository('product');
    }

    async getAll(){
        return await this._baseRepository.getAll();
    }

    async getById(id){
        return await this._baseRepository.getById(id);
    }

    async create(data){
        return await this._baseRepository.create(data);
    }

    async update(id, data){
        return await this._baseRepository.update(id, data);
    }

    async delete(id){
        return await this._baseRepository.delete(id);
    }
}

module.exports = productRepository;