'user strict'

const repository = require('../repositories/category-repository');


function categoryController(){

}

categoryController.prototype.get = async (req, res) => {
    res.status(200).send(await new repository().getAll());
};

categoryController.prototype.getById = async (req, res) => {
    res.status(200).send(await new repository().getById(req.params.id));
};

categoryController.prototype.post = async (req, res) => {
    res.status(200).send(await new repository().create(req.body));
};

categoryController.prototype.put = async (req, res) => {
    res.status(200).send(await new repository().update(req.params.id, req.body));
};

categoryController.prototype.delete = async (req, res) => {
    res.status(200).send(await new repository().delete(req.params.id));
};

module.exports =  categoryController;