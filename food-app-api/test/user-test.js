const mongoose = require('mongoose');
const md5 = require('md5');
const userModel = require('../models/user-model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

const should = chai.should();

chai.use(chaiHttp);

describe('Usuários', () => {
    let token = '';

    before((done) => {
        //removendo usuários testes existente
        console.log('Removendo usuários de testes')
        userModel.remove({ name: 'Usuário Mocha'}, () => {
            //testando o cadastro de novo usuário
            let user = new userModel({
                name: 'Usuário Mocha',
                email: 'mocha@gmail.com',
                password: md5('mocha@123'),
                phone: '(00) 000 000 000'
            });        
    
            user.save().then(() => {                
                console.log('Novo usuário salvo.')

                //Autenticando usuário na aplicação
                chai.request(server)
                    .post('/api/users/authenticate')
                    .send({ email: user.email, password: 'mocha@123' })
                    .end((error, response) => {

                        token = response.body.token;
                        console.log(response.body);

                        done();
                    });
            });
        });        
    })

    describe('/GET', () => {
        it('lista usuários da API', (done) => { 
            chai.request(server)
                .get('/api/users')
                .set('authorization', token)
                .end((error, response) => {

                    console.log(response.body);
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                    done();

                });
        });
    });    

});