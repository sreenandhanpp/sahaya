const { body } = require("express-validator");
const Campaign = require("../MongoDb/models/adminModels/campaign");

module.exports = [
  // Validate account number
  body("account_no").custom(async (value, { req }) => {
    // Check if the account number exists in the database (if necessary)
    const existingCampaign = await Campaign.findOne({ account_no: value });
    if (existingCampaign && existingCampaign._id.toString() !== req.body.id) {
      throw new Error("Account number already exists");
    }

    return true;
  }),

  // Validate IFSC code
  body("ifsc").custom(async (value, { req }) => {
    // Check if the IFSC code exists in the database (if necessary)
    const existingCampaign = await Campaign.findOne({ ifsc: value });
    if (existingCampaign && existingCampaign._id.toString() !== req.body.id) {
      throw new Error("IFSC code already exists");
    }

    return true;
  }),
];
