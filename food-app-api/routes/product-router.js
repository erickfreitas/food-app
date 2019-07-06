'use restrict'

const express = require('express');
const controller = require('../controllers/product-controller')
const router = express.Router();
const auth = require('../middlewares/authentication');

let _controller = new controller();

router.get('/', auth, _controller.get);
router.get('/:id',auth, _controller.getById);
router.post('/', auth,  _controller.post);
router.put('/:id', auth, _controller.put);
router.delete('/:id', auth, _controller.delete);

module.exports = router;
