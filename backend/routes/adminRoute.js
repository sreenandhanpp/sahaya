const express = require("express");
const userHelper = require("../helpers/userHelper/index");
const adminHelper = require("../helpers/adminHelper");
const signupValidator = require("../middlewares/signupValidator");
const { validationResult } = require("express-validator");
const upload = require("../middlewares/multer");
const checkAccountDetails = require("../middlewares/checkAccountDetails");
const deleteImage = require("../utils/deleteImage");
const router = express.Router();

//admin root route
router.post(
  "/create-campaign",
  upload.single("img"),
  checkAccountDetails,
  (req, res) => {
    try {
      let err = validationResult(req);
      if (!err.isEmpty()) {
        deleteImage(req.file.filename);
        res.status(401).json({ errors: err.array() });
      } else {
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
      res
        .status(400)
        .json({ message: "Something went wrong on creating campaign" });
    }
  }
);

// router.post("/check-account-details", checkAccountDetails, (req, res) => {
//   let err =  validationResult(req);
//   if (!err.isEmpty()) {
//     // If there are validation errors, respond with a status code 400 and error messages
//     res.status(400).json({ message: "Email already exist" });
//   } else {
//     res.status(200);
//   }
// });

router.post(
  "/update-campaign",
  upload.single("img"),
  checkAccountDetails,
  (req, res) => {
    console.log(req.body);
    let err = validationResult(req);
    if (!err.isEmpty()) {
      if (req.file) {
        deleteImage(req.file.filename);
      }
      res.status(401).json({ errors: err.array() });
    } else {
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

//get user details
router.post("/delete-campaign", (req, res) => {
  adminHelper
    .deleteCampaign(req.body.id)
    .then((resp) => {
      res.status(200).json({ message: resp });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

//updating the user
router.post("/api/edit-user", signupValidator, (req, res) => {});

router.post("/api/delete-user", (req, res) => {});
//create user post route
router.post("/api/create-user", signupValidator, (req, res) => {});
module.exports = router;
