const express = require("express");
const userHelper = require("../helpers/userHelper/index");
const adminHelper = require("../helpers/adminHelper");
const signupValidator = require("../middlewares/signupValidator");
const { validationResult } = require("express-validator");
const upload = require("../middlewares/multer");
const checkAccountDetails = require("../middlewares/checkAccountDetails");
const deleteImage = require("../utils/deleteImage");
const router = express.Router();

// Route to create a new campaign
router.post(
  "/create-campaign",
  upload.single("img"),
  checkAccountDetails,
  (req, res) => {
    try {
      let err = validationResult(req);
      if (!err.isEmpty()) {
        // If there are validation errors, delete the uploaded image and respond with the errors
        deleteImage(req.file.filename);
        res.status(401).json({ errors: err.array() });
      } else {
        // Create a new campaign using adminHelper and respond with a success message
        adminHelper
          .createCampaign(req.body, req.file)
          .then((resp) => {
            res.status(200).json({ message: resp });
          })
          .catch((err) => {
            res.status(400).json({ message: err });
          });
      }
    } catch (error) {
      // Handle general errors and respond with an error message
      res
        .status(400)
        .json({ message: "Something went wrong on creating campaign" });
    }
  }
);

// Route to update an existing campaign
router.post(
  "/update-campaign",
  upload.single("img"),
  checkAccountDetails,
  (req, res) => {
    console.log(req.body);
    let err = validationResult(req);
    if (!err.isEmpty()) {
      if (req.file) {
        // If there are validation errors and a new image was uploaded, delete the image
        deleteImage(req.file.filename);
      }
      res.status(401).json({ errors: err.array() });
    } else {
      // Update the campaign using adminHelper and respond with a success message
      adminHelper
        .updateCampaign(req.body, req.file)
        .then((resp) => {
          res.status(200).json({ message: resp });
        })
        .catch((err) => {
          res.status(400).json({ message: err });
        });
    }
  }
);

// Route to delete a campaign
router.post("/delete-campaign", (req, res) => {
  adminHelper
    .deleteCampaign(req.body.id)
    .then((resp) => {
      // Delete the campaign and respond with a success message
      res.status(200).json({ message: resp });
    })
    .catch((err) => {
      // Handle errors when deleting a campaign and respond with an error message
      res.status(400).json({ message: err });
    });
});


module.exports = router;
