'user strict'

const repository = require('../repositories/product-repository');


function productController(){

}

productController.prototype.get = async (req, res) => {
    res.status(200).send(await new repository().getAll());
};

productController.prototype.getById = async (req, res) => {
    res.status(200).send(await new repository().getById(req.params.id));
};

productController.prototype.post = async (req, res) => {
    res.status(200).send(await new repository().create(req.body));
};

productController.prototype.put = async (req, res) => {
    res.status(200).send(await new repository().update(req.params.id, req.body));
};

productController.prototype.delete = async (req, res) => {
    res.status(200).send(await new repository().delete(req.params.id));
};

module.exports =  productController;