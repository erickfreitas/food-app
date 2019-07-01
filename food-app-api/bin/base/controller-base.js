exports.post = async (repository, validationContract, req, res) => {
    try{
        if(!validationContract.isValid()){
            res.status(400).send({
                message: "There is invalid data in your request.",
                validation: validationContract.errors()
            }).end();
            return;
        }
        res.status(200).send(await repository.create(req.body));
    }
    catch(error){
        console.log(`Error in request, reason: ${error}`);
        res.status(500).send({ message: "Error while processing.", error: error });
    }    
}

exports.put = async (repository, validationContract, req, res) => {
    try{
        if(!validationContract.isValid()){
            res.status(400).send({
                message: "There is invalid data in your request.",
                validation: validationContract.errors()
            }).end();
            return;
        }
        res.status(200).send(await repository.update(req.params.id, req.body));
    }
    catch(error){
        console.log(`Error in request, reason: ${error}`);
        res.status(500).send({ message: "Error while processing.", error: error });
    }  
}

exports.get = async (repository, req, res) => {
    try{
        res.status(200).send(await repository.getAll());
    }
    catch(error){
        console.log(`Error in request, reason: ${error}`);
        res.status(500).send({ message: "Error while processing.", error: error });
    }  
}

exports.getById = async (repository, req, res) => {
    try{
        if(req.params.id){
            res.status(200).send(await repository.getById(req.params.id));
        }
        else{
            res.status(400).send({ message: "The Id parameter need to be provided."})
        }
    }
    catch(error){
        console.log(`Error in request, reason: ${error}`);
        res.status(500).send({ message: "Error while processing.", error: error });
    } 
}

exports.delete = async (repository, req, res) => {
    try{
        if(req.params.id){
            await repository.delete(req.params.id);
            res.status(200).send({ message: "Register was deleted successfully."});
        }
        else{
            res.status(400).send({ message: "The Id parameter need to be provided."})
        }
    }
    catch(error){
        console.log(`Error in request, reason: ${error}`);
        res.status(500).send({ message: "Error while processing.", error: error });
    } 
}