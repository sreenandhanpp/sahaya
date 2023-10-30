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
          deadLine: patient.deadLine,
          img: file.filename,
        });
        campaign
          .save(campaign)
          .then((res) => {
            resolve("Campaign created successfully");
          })
          .catch((err) => {
            reject("Something went wrong on creating campaign");
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong on creating campaign");
      }
    });
  },
  updateCampaign: (patient, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (file) {
          patient.img = file.filename;
        }
        Campaign.updateOne(
          { _id: new ObjectId(patient.userId) },
          {
            $set: patient,
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
            reject("Something went wrong on deleting campaign")
          });
      } catch (error) {}
    });
  },
};
