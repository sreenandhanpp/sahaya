// Importing modules
const mongoose = require('mongoose');

// Defining the structure of the collection
const donationSchema = new mongoose.Schema({
    campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Success', 'Failed'], // Assuming these are the possible payment statuses
        default: 'Pending'
    },
    razorpay_order_id:{
        type:String,
    },
    razorpay_payment_id:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Creating the model
const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
