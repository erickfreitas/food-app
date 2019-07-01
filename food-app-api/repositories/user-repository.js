require('../models/user-model');

const baseRepository = require('../bin/base/repository-base');
const md5 = require('md5');

class userRepository{
    constructor(){
        this._baseRepository = new baseRepository('user');
        this._projection = 'name email _id';
    }    

    async authenticate(email, password){
        let passwordHash = md5(password);
        return await this._baseRepository._model.findOne({ email: email, password: passwordHash }, this._projection);
    }

    async getAll(){
        return await this._baseRepository._model.find({}, this._projection);
    }

    async getById(id){
        return await this._baseRepository._model.findById(id, 'name email _id image');
    }

    async getByEmail(email){
        return await this.baseRepository._model.findOne({ email: email }, this._projection);
    }

    async create(data){
        let createdUser = await this._baseRepository.create(data);
        return await this.baseRepository._model.findById(createdUser.id, this._projection);
    }

    async update(id, data){
        let updatedUser = await this._baseRepository.update({
            name: data.name,
            email: data.email,
            image: data.image
        });
        return await this.baseRepository._model.findById(updatedUser.id, this._projection);
    }

    async delete(id){
        return await this._baseRepository.delete(id);
    }
}

module.exports = userRepository;