const jwt = require('jsonwebtoken')
const variables = require('../bin/configuration/variables');
module.exports = async (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['authorization']
    if(token){
        try{
            let decoded = await jwt.verify(token, variables.Security.secretKey);
            req.loggedUser = decoded;
            next();
        }
        catch(error){
            res.status(401).send({message: 'Invalid token.'})
        }
    }
    else{
        res.status(401).send({message: 'The authentication token is required.'});
        return;
    }
}