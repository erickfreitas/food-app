const mongoose = require('mongoose');
const model = require('../models/user-model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Usuários', () => {
    describe('/GET', () => {
        it('lista usuários da API', (done) => { 
            chai.request(server)
                .get('/api/users')
                .end((error, response) => {
                    console.log(response.body);
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                    done();
                });
        });
    });    
});