'user strict'

const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const md5 = require('md5');
const controllerBase = require('../bin/base/controller-base');
const _repository = new repository();

function userController(){

}

userController.prototype.get = async (req, res) => {
    res.status(200).send(await controllerBase.get(_repository, req, res));
};

userController.prototype.getById = async (req, res) => {
    res.status(200).send(await controllerBase.getById(_repository, req, res));
};

userController.prototype.post = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.name, 'Informe o nome.');
    validationContract.isRequired(req.body.email, 'Informe o e-mail.');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');
    validationContract.isRequired(req.body.password, 'Informe a senha.');
    validationContract.isRequired(req.body.confirmPassword, 'Confirme a senha');
    validationContract.isTrue(req.body.email !== req.body.confirmPassword, 'A senha e confirmação de senha devem ser iguais.');

    let userByEmail = _repository.getByEmail(req.body.email);
    if(userByEmail){
        validationContract.isTrue(true, `O e-mail ${userByEmail.email} já está em uso.`);
    }

    //Criptografando senha
    req.body.password = md5(req.body.password);

    await controllerBase.post(_repository, validationContract, req, res);
};

userController.prototype.put = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.name, 'Informe o nome.');
    validationContract.isRequired(req.body.email, 'Informe o e-mail.');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');
    validationContract.isRequired(req.params.id, 'Informe o id do usuário que será editado');    

    let userByEmail = _repository.getByEmail(req.body.email);
    if(userByEmail){
        validationContract.isTrue(userByEmail && userByEmail.id != req.params.id, `O e-mail ${userByEmail.email} já está em uso.`);
    }

    controllerBase.put(_repository, validation, req, res);
};

userController.prototype.delete = async (req, res) => {
    res.status(200).send(await _repository.delete(req.params.id));
};

module.exports =  userController;