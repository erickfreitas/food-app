'user strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categoryModel = new schema({
    title: { trim: true, index: true, required: true, type: String },
    description: { type: String },
    image: { type: String, required: true },
    active: { type: Boolean },
    createdAt: { type: Date, default: Date.now }, 
}, { versionKey: false });

categoryModel.pre('save', next =>{
    if(!this.createdAt){
        this.createdAt = new Date();
    }
    next();
})

module.exports = mongoose.model('category', categoryModel);