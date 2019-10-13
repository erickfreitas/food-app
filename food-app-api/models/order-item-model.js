'user strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderItemModel = new schema({
    // orderId: { type: schema.Types.ObjectId, ref: 'order' },
    productId: { type: schema.type.ObjectId, ref: 'product' },
    quantity: { type: Number, required: true, default: 0 }
})

module.exports = mongoose.model('orderItem', orderItemModel)