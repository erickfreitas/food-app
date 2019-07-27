'user strict'

const repository = require('../repositories/product-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _repository = new repository();


function productController(){

}

productController.prototype.get = async (req, res) => {
    controllerBase.get(_repository, req, res);
};

productController.prototype.getById = async (req, res) => {
    controllerBase.getById(_repository, req, res);
};

productController.prototype.post = async (req, res) => {
    var validationContract = new validation();
    validationContract.isRequired(req.body.name, 'Informe o nome.');
    validationContract.isRequired(req.body.description, 'Informe a descrição.');
    validationContract.isRequired(req.body.price, 'Informe o preço.');
    validationContract.isRequired(req.body.image, 'Forneça a imagem.');
    validationContract.isRequired(req.body.categoryId, 'Informe a categoria do produto.');
    controllerBase.post(_repository, validationContract, req, res);
};

productController.prototype.put = async (req, res) => {
    var validationContract = new validation();
    validationContract.isRequired(req.body.name, 'Informe o nome.');
    validationContract.isRequired(req.body.description, 'Informe a descrição.');
    validationContract.isRequired(req.body.price, 'Informe o preço.');    
    validationContract.isRequired(req.body.image, 'Forneça a imagem.');
    validationContract.isRequired(req.params.id, 'Informe o id do produto que será editado.');  
    validationContract.isRequired(req.body.categoryId, 'Informe a categoria do produto.');
    if(req.body.price) 
        validationContract.isTrue(req.body.price == 0, 'O preço deve ser maior do que zero.');
    controllerBase.put(_repository, validationContract, req, res);
};

productController.prototype.delete = async (req, res) => {
    controllerBase.delete(_repository, req, res);
};

module.exports =  productController;