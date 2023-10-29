const User = require("../../MongoDb/models/userModels/User.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const generateOtp = require("../../utils/generateOtp.js");
const Otp = require("../../MongoDb/models/userModels/mailOtp.js");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
  // Function to create a new user account
  doSignup: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(userData);
        // Hash the user's password using bcrypt
        userData.password = await bcrypt.hash(userData.password, 10);

        // Create a new User instance with user data
        const user = new User({
          fullname: userData.fullname,
          email: userData.email,
          admin: false,
          password: userData.password,
        });

        // Save the user to the database
        user
          .save(user)
          .then((data) => {
            // Return user data after successful account creation
            const userData = {
              _id:data._id,
              fullname: data.fullname,
              email: data.email,
              admin: data.admin,
            };
            resolve(userData);
          })
          .catch((err) => {
            // Handle errors during user creation
            reject("Something went wrong on creating account");
          });
      } catch (error) {
        // Handle exceptions (e.g., if bcrypt.hash fails)
        reject("Something went wrong on creating account");
      }
    });
  },

  // Function to validate user login
  doLogin: (userData) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Find a user with the provided email in the database
        const user = await User.findOne({ email: userData.email });

        if (user) {
          // Compare the provided password with the hashed password in the database
          let status = await bcrypt.compare(userData.password, user.password);

          if (status) {
            // If credentials are valid, create a data object with user information
            const data = {
              fullname: user.fullname,
              email: user.email,
              admin: user.admin,
            };
            resolve(data);
          } else {
            // Reject with an error message for incorrect password
            reject("Incorrect email or password");
          }
        } else {
          // Reject with an error message for email not found
          reject("Email id not found");
        }
      } catch (error) {
        // Handle any unexpected errors during the sign-in process
        reject("Something went wrong on sign-in process");
      }
    });
  },

  // Function to send an OTP verification email
  sendOtpVerificationEmail: ({ _id, email }) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Generate a one-time password (OTP)
        const otp = await generateOtp();

        // Define email content and options
        const mailOptions = {
          from: "sreenandhanpp@gmail.com",
          to: email,
          subject: "Verify Your Email",
          html: `<p>Enter <b>${otp}</b> in the app to verify your 
                        email address and complete the signup process</p>
                        <p>This code <b>expires in 1 hour</b>.</p>`,
        };

        // Create a mail transporter using nodemailer
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
          },
        });

        // Hash the OTP for storage and security
        const hashedOtp = await bcrypt.hash(otp, 10);

        // Create a new OTP entry and save it to the database
        const userOtp = new Otp({
          userId: new ObjectId(_id),
          otp: hashedOtp,
          createdAt: Date.now(),
          expiresAt: Date.now() + 3600000, // Expires in 1 hour
        });

        // Send the OTP email and resolve upon successful sending
        await userOtp.save();
        await transporter.sendMail(mailOptions);
        resolve("OTP sent successfully");
      } catch (error) {
        reject("Something went wrong, request another OTP");
      }
    });
  },

  // Function to verify an email OTP
  VerifyEmailOtp: ({ _id, otp }) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Find the OTP entry associated with the user's ID
        const user = await Otp.findOne({
          userId: new ObjectId(_id),
        });

        if (!user) {
          // Reject if the OTP entry is not found
          reject("User not found");
        } else {
          const { expiresAt } = user.expiresAt;
          const hashedOtp = user.otp;

          if (expiresAt < Date.now()) {
            // Reject if the OTP has expired
            await Otp.deleteOne({ userId: new ObjectId(_id) });
            reject("Code has expired. Please request again");
          } else {
            // Compare the provided OTP with the hashed OTP
            const validOtp = await bcrypt.compare(otp, hashedOtp);

            if (!validOtp) {
              // Reject if the provided OTP is invalid
              reject("Invalid code. Please check your inbox");
            } else {
              // Delete the OTP entry and resolve upon successful verification
              await Otp.deleteOne({ userId: new ObjectId(_id) });
              resolve("Email verified successfully.");
            }
          }
        }
      } catch (error) {
        console.log(error)
        reject("Something went wrong on verifying OTP,try again");
      }
    });
  },
};
