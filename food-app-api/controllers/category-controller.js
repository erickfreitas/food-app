'user strict'

const repository = require('../repositories/category-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _repository = new repository();


function categoryController(){

}

categoryController.prototype.get = async (req, res) => {
    controllerBase.get(_repository, req, res);
};

categoryController.prototype.getById = async (req, res) => {
    controllerBase.getById(_repository, req, res);
};

categoryController.prototype.post = async (req, res) => {
    var validationContract = new validation();
    validationContract.isRequired(req.body.title, "Informe o título.");
    validationContract.isRequired(req.body.image, "Forneça a imagem.");
    controllerBase.post(_repository, validationContract, req, res);
};

categoryController.prototype.put = async (req, res) => {
    var validationContract = new validation();
    validationContract.isRequired(req.body.title, "Informe o título.");
    validationContract.isRequired(req.body.image, "Forneça a imagem.");
    validationContract.isRequired(req.params.id, 'Informe o id da categoria que será editada.');  
    controllerBase.put(_repository, validationContract, req, res);
};

categoryController.prototype.delete = async (req, res) => {
    controllerBase.delete(_repository, req, res);
};

module.exports =  categoryController;