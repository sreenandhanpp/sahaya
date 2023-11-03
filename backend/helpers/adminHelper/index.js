const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../../MongoDb/models/userModels/User");
const bcrypt = require("bcrypt");
const Campaign = require("../../MongoDb/models/adminModels/campaign");

module.exports = {
  createCampaign: (patient, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        const campaign = new Campaign({
          fullname: patient.fullname,
          address: patient.address,
          account_no: patient.account_no,
          ifsc: patient.ifsc,
          disease: patient.disease,
          amount: patient.amount,
          deadLine: patient.date,
          img: file.filename,
        });
        campaign
          .save(campaign)
          .then((res) => {
            resolve("Campaign created successfully");
          })
          .catch((err) => {
            console.log(err);
            reject("Something went wrong on creating campaign");
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong on creating campaign");
      }
    });
  },
  updateCampaign: (data, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        let campaign = {
          id: data.id,
          fullname: data.fullname,
          address: data.address,
          account_no: data.account_no,
          ifsc: data.ifsc,
          disease: data.disease,
          amount: data.amount,
          deadLine: data.date,
        };
        if (file) {
          campaign.img = file.filename;
        }
        Campaign.updateOne(
          { _id: new ObjectId(campaign.id) },
          {
            $set: campaign,
          }
        )
          .then((res) => {
            resolve("Campaign updated successfully");
          })
          .catch((err) => {
            reject("Something went wrong on updating campaign");
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong on updating campaign");
      }
    });
  },
  deleteCampaign: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        Campaign.deleteOne({ _id: new ObjectId(userId) })
          .then((resp) => {
            resolve("Campaign deleted successfully");
          })
          .catch((err) => {
            reject("Something went wrong on deleting campaign");
          });
      } catch (error) {}
    });
  },
};
