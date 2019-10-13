require('../models/order-model');
const baseRepository = require('../bin/base/repository-base');

class orderRepository {
    constructor() {
        this._baseRepository = new baseRepository('order')
    }

    async getAll(){
        return await this._baseRepository.getAll();
    }

    async getById(id){
        return await this._baseRepository.getById(id);
    }

    async getByUserId(userId){
        return await this._baseRepository._model.find({ userId: userId });
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

module.exports = orderRepository;