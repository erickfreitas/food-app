'user strict'

function categoryController(){

}

categoryController.prototype.get = async (req, res) => {

};

categoryController.prototype.getById = async (req, res) => {
    res.status(200).send(`O id passado foi ${req.params.id}`);
};

categoryController.prototype.post = async (req, res) => {

};

categoryController.prototype.put = async (req, res) => {

};

categoryController.prototype.delete = async (req, res) => {

};

module.exports =  categoryController;