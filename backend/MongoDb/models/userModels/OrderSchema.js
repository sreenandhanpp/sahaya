//importing modules
const mongoose = require('mongoose');

//defining the structure of the collection
const Schema = new mongoose.Schema({
    order_id: {
        type:String,
        required:true,
        unique:true
    },
    amount:{
        type:String,
        required:true,
    },
    createdAt:{
        type:String,
        required:true
    },
});

//creating the model
const Order = mongoose.model('order',Schema);

module.exports = Order;