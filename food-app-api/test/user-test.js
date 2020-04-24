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
    let registeredUserId = '';

    before((done) => {
        //removendo usuários testes existente
        //console.log('Removendo usuários de testes')
        userModel.remove({ name: 'Usuário Mocha'}, () => {
            //testando o cadastro de novo usuário
            let user = new userModel({
                name: 'Usuário Mocha',
                email: 'mocha@gmail.com',
                password: md5('mocha@123'),
                phone: '(00) 000 000 000'
            });        
    
            user.save().then(() => {                
                //console.log('Novo usuário salvo.')

                //Autenticando usuário na aplicação
                chai.request(server)
                    .post('/api/users/authenticate')
                    .send({ email: user.email, password: 'mocha@123' })
                    .end((error, response) => {

                        token = response.body.token;
                        //console.log(response.body);

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

                    //console.log(response.body);
                    response.body.should.be.a('array');
                    response.should.have.status(200);
                    done();

                });
        });
    });    

    describe('/POST', () => {
        it('registrar novo usuário', (done) => {
            chai.request(server)
                .post('/api/users/register')
                .send({
                    name: 'Usuário Mocha',
                    email: 'mocha1@gmail.com',
                    password: 'mocha@123',
                    confirmPassword: 'mocha@123',
                    phone: '(00) 000 000 000'
                })
                .end((error, response) => {

                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('email').eq('mocha1@gmail.com');
                    registeredUserId = response.body._id;
                    done();

                })
        });

        it('autenticar o novo usuário', (done) => {
            chai.request(server)
                .post('/api/users/authenticate')
                .send({email: 'mocha1@gmail.com', password: 'mocha@123'})
                .end((error, response) => {

                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.have.a.property('token');
                    done();

                });
        });

        it('recuperar dados do usuário cadastrado', (done) => {
            chai.request(server)
                .get(`/api/users/${registeredUserId}`)
                .set('authorization', token)
                .end((error, response) => {

                    //console.log(response.body);
                    response.body.should.be.a('object');
                    response.body.should.have.property('email').eq('mocha1@gmail.com');
                    done();
                })
        });
    })

    describe('/PUT', () => {
        it('atualizando nome do usuário', (done) => {
            chai.request(server)
                .put(`/api/users/${registeredUserId}`)
                .set('authorization', token)
                .send({email: 'mocha1@gmail.com', name: 'Mocha nome | ALTERADO'})
                .end((error, response) => {

                    //console.log(response.body);
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('name').eq('Mocha nome | ALTERADO');
                    done();

                });
        });
    });

    describe('/DELETE', () => {
        it('deletando usuário', (done) => {
            chai.request(server)
                .del(`/api/users/${registeredUserId}`)
                .set('authorization', token)
                .end((error, response) => {

                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('Register was deleted successfully.');
                    done();
                    
                });
        });
    });

});