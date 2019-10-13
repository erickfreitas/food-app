'use restrict'

const express = require('express');
const controller = require('../controllers/order-controller');
const router = express.Router();
const auth = require('../middlewares/authentication');

let _controller = new controller();

router.get('/', auth, _controller.get);
router.get('/:id', auth, _controller.getById);
router.post('/', auth, _controller.post);

module.exports = router;