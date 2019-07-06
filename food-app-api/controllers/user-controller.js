'user strict'

const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const md5 = require('md5');
const controllerBase = require('../bin/base/controller-base');
const _repository = new repository();
const jwt = require('jsonwebtoken');
const variables = require('../bin/configuration/variables');

function userController(){

}

userController.prototype.get = async (req, res) => {
    await controllerBase.get(_repository, req, res);
};

userController.prototype.getById = async (req, res) => {
    await controllerBase.getById(_repository, req, res);
};

userController.prototype.post = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.name, 'Informe o nome.');
    validationContract.isRequired(req.body.email, 'Informe o e-mail.');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');
    validationContract.isRequired(req.body.password, 'Informe a senha.');
    validationContract.isRequired(req.body.confirmPassword, 'Confirme a senha');
    validationContract.isTrue(req.body.password !== req.body.confirmPassword, 'A senha e confirmação de senha devem ser iguais.');
    let userByEmail = await _repository.getByEmail(req.body.email);
    if(userByEmail != undefined){
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
    let userByEmail = await _repository.getByEmail(req.body.email);
    if(userByEmail){
        validationContract.isTrue(userByEmail && userByEmail.id != req.params.id, `O e-mail ${userByEmail.email} já está em uso.`);
    }

    controllerBase.put(_repository, validationContract, req, res);
};

userController.prototype.delete = async (req, res) => {
    await controllerBase.delete(_repository, req, res);
};

userController.prototype.authenticate = async (req, res) => {
    let validationContract = new validation();
    validationContract.isRequired(req.body.email, 'Informe o e-mail.');
    validationContract.isEmail(req.body.email, 'O e-mail informado é inválido.');
    validationContract.isRequired(req.body.password, 'Informe a senha.');
    if(!validationContract.isValid()){
        res.status(400).send({message: 'Não foi possível efetuar o login', validation : validationContract.errors() });
        return;
    }    

    let user = await _repository.authenticate(req.body.email, req.body.password);

    if(user){
        res.status(200).send({ user : user, token: jwt.sign({ user: user } , variables.Security.secretKey)});
    }
    else{
        res.status(404).send({message: 'Usuário ou senha inválido.'})
    }
}
module.exports =  userController;