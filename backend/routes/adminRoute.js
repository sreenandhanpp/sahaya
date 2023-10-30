const express = require("express");
const userHelper = require("../helpers/userHelper/index");
const adminHelper = require("../helpers/adminHelper");
const signupValidator = require("../middlewares/signupValidator");
const { validationResult } = require("express-validator");
const upload = require("../middlewares/multer");
const router = express.Router();

//admin root route
router.post("/create-campaign", upload.single("img"), (req, res) => {
  adminHelper
    .createCampaign(req.body, req.file)
    .then((resp) => {
      res.status(200).json({ message: resp });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.post("/update-campaign", upload.single("img"), (req, res) => {
  adminHelper
    .updateCampaign(req.body, req.file)
    .then((resp) => {
      res.status(200).json({ message: resp });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

//get user details
router.post("/delete-campaign", (req, res) => {
  adminHelper
    .deleteCampaign(req.body.userId)
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
