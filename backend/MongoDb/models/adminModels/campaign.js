const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  account_no: {
    type: String,
    required: true,
    unique: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  deadLine: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true
  }
});

const Campaign = mongoose.model("campaign", Schema);

module.exports = Campaign;
