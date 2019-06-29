'use restrict'

const express = require('express');
const controller = require('../controllers/product-controller')
const router = express.Router();

let _controller = new controller();

router.get('/', _controller.get);
router.get('/:id', _controller.getById);
router.post('/', _controller.post);
router.put('/:id', _controller.put);
router.delete('/:id', _controller.delete);

module.exports = router;
