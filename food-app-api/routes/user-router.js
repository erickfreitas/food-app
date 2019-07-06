'use restrict'

const express = require('express');
const controller = require('../controllers/user-controller')
const router = express.Router();
const auth = require('../middlewares/authentication');

let _controller = new controller();

//public routes
router.post('/authenticate', _controller.authenticate);
router.post('/register', _controller.post);

//authenticated routes
router.get('/', auth, _controller.get);
router.get('/:id', auth, _controller.getById);
router.post('/', auth, _controller.post);
router.put('/:id', auth, _controller.put);
router.delete('/:id', auth, _controller.delete);

module.exports = router;
