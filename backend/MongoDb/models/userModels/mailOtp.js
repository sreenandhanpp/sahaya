//importing modules
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

//defining the structure of the collection
const OtpSchema = new mongoose.Schema({
    userId: {
        type:ObjectId,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        required:true,
        unique:true
    },
    createdAt:{
        type:Date,
        required:true
    },
    expiresAt:{
        type:Date,
        required:true
    }
});

//creating the model
const Otp = mongoose.model('emailOtp',OtpSchema);

module.exports = Otp;