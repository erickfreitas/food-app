'user strict'

const repository = require('../repositories/order-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _repository = new repository();

function orderController() {

}

orderController.prototype.get = async (req, res) => {
    let result = await _repository.getByUserId(req.loggedUser.user._id);
    res.status(200).send(result);
}

orderController.prototype.getById = async (req, res) => {
    controllerBase.getById(_repository, req, res);
}

orderController.prototype.post = async (req, res) => {
    var validationContract = new validation();
    validationContract.isRequired(req.body.totalValue, 'Informe o valor total.');
    validationContract.isRequired(req.body.items, 'Informe os itens do pedido.');

    req.body.userId = req.loggedUser.user._id;

    controllerBase.post(_repository, validationContract, req, res);
}

module.exports = orderController;