'user strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productModel = new schema({
    name: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    active: { type: Boolean, require: true },
    createAt: { type: Date, default: Date.now}
}, { versionKey: false });

productModel.pre('save', next =>{
    if(!this.createdAt){
        this.createdAt = new Date();
    }
    next();
})

module.exports = mongoose.model('product', productModel);
