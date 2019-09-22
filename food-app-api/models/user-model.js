'user strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = new schema({
    name: { type: String, required: true, trim: true, index: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    image: { type: String, required: false },
    active: { type: Boolean, require: true },
    createAt: { type: Date, default: Date.now}
}, { versionKey: false });

userModel.pre('save', next =>{
    if(!this.createdAt){
        this.createdAt = new Date();
    }
    next();
})

module.exports = mongoose.model('user', userModel);
