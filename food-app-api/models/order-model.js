'user strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const orderModel = new schema({
    userId: { type: schema.Types.ObjectId, ref: 'user' },
    totalValue: { type: Number, required: true },
    items: { type: String, required: true },
    orderData: { type: Date, default: Date.now}
})

orderModel.pre('save', next =>{
    if(!this.orderData){
        this.orderData = new Date();
    }
    next();
})

module.exports = mongoose.model('order', orderModel);