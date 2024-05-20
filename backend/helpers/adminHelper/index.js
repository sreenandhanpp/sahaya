const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const User = require("../../MongoDb/models/userModels/User");
const Campaign = require("../../MongoDb/models/adminModels/campaign");

module.exports = {
  // Function to create a new campaign in the database
  createCampaign: (patient, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a new Campaign object with the provided patient data and file information
        const campaign = new Campaign({
          fullname: patient.fullname,
          address: patient.address,
          account_no: patient.account_no,
          ifsc: patient.ifsc,
          disease: patient.disease,
          amount: patient.amount,
          deadLine: patient.date,
          img: file.filename,
          about: patient.about
        });

        // Save the campaign to the database
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

  // Function to update an existing campaign in the database
  updateCampaign: (data, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a campaign object with updated data
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

        // If a new file is provided, update the 'img' property
        if (file) {
          campaign.img = file.filename;
        }

        // Update the campaign in the database
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

  // Function to delete a campaign from the database
  deleteCampaign: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Delete a campaign based on the provided user ID
        Campaign.deleteOne({ _id: new ObjectId(userId) })
          .then((resp) => {
            resolve("Campaign deleted successfully");
          })
          .catch((err) => {
            reject("Something went wrong on deleting campaign");
          });
      } catch (error) {
        // Handle potential errors (empty catch block)
      }
    });
  },
};
