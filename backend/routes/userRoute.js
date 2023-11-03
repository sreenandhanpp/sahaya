const express = require("express");
const router = express.Router();
const signupValidate = require("../middlewares/signupValidator");
const { validationResult } = require("express-validator");
const isExist = require("../middlewares/checkMail");
const loginValidator = require("../middlewares/loginValidator");
const userHelper = require("../helpers/userHelper");
const checkMail = require("../middlewares/checkMail");
const {
  resendPhoneOtp,
  resendEmailOtp,
} = require("../helpers/userHelper/resendOtp");

// Route for handling user signup
router.post("/signup", checkMail, async (req, res) => {
  try {
    let err = validationResult(req);
    if (!err.isEmpty()) {
      // If there are validation errors, respond with a status code 400 and error messages
      res.status(400).json({ message: "Email already exist" });
    } else {
      // Call the doSignup function from userHelper to create a new user
      userHelper
        .doSignup(req.body)
        .then((resp) => {
          // Store the user data in the session for user authentication
          req.session.user = resp;

          // Respond with a success status and the user data
          res.status(200).json(resp);
        })
        .catch((err) => {
          res.status(400).json({ message: err });
        });
    }
  } catch (error) {
    // Handle errors gracefully by responding with an error message
    res.status(400).json({ message: "An unexpected error occurred" });
  }
});

// Route for sending an email OTP
router.post("/send-email-otp", (req, res) => {
  try {
    // Call the sendOtpVerificationEmail function from userHelper to send an OTP email
    userHelper
      .sendOtpVerificationEmail(req.body)
      .then((resp) => {
        // Respond with a success status and a message
        res.status(200).json({ message: resp });
      })
      .catch((err) => {
        // Handle errors gracefully by responding with an error message
        res.status(400).json({ message: err.message });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

// Route for verifying an email OTP
router.post("/verify-email-otp", (req, res) => {
  try {
    // Call the VerifyEmailOtp function from userHelper to verify the email OTP
    userHelper
      .VerifyEmailOtp(req.body)
      .then((resp) => {
        // Respond with a success status and a message
        res.status(200).json({ message: resp });
      })
      .catch((err) => {
        console.log(err);
        // Handle errors by responding with an unauthorized status and an error message
        res.status(401).json({ message: err });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

//resending email otp route
router.post("/resend-email-otp", (req, res) => {
  resendEmailOtp(req.body)
    .then((resp) => {
      res.json({ message: resp }).status(200);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// Route for user login
router.post("/login", (req, res) => {
  try {
    // Call the doLogin function from userHelper to perform user login
    userHelper
      .doLogin(req.body)
      .then((resp) => {
        // Store user data in the session for user authentication
        req.session.user = resp;
        // Respond with a success status and user data
        res.status(200).json(resp);
      })
      .catch((err) => {
        console.log(err);
        // Handle login failures by responding with an unauthorized status and an error message
        res.status(401).json({ message: err });
      });
  } catch (error) {
    // Handle unexpected errors and respond with a generic error message
    res.status(500).json({ message: "An unexpected error occurred." });
  }
});

router.get("/campaigns", (req, res) => {
  userHelper
    .getAllCampaign()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.post("/campaign", (req, res) => {
  userHelper
    .getCampagin(req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.json({ message: "loggedout successfully" }).status(200);
});

module.exports = router;
