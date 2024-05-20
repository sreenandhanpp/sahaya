const User = require("../../MongoDb/models/userModels/User.js");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const generateOtp = require("../../utils/generateOtp.js");
const Otp = require("../../MongoDb/models/userModels/mailOtp.js");
const mongoose = require("mongoose");
const Campaign = require("../../MongoDb/models/adminModels/campaign.js");
const ObjectId = mongoose.Types.ObjectId;
const Razorpay = require("razorpay");
const Order = require("../../MongoDb/models/userModels/OrderSchema.js");
const Donation = require("../../MongoDb/models/userModels/Donations.js");
const deleteImage = require("../../utils/deleteImage.js");

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
              _id: data._id,
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
        console.log(user);
        console.log(userData);
        if (user) {
          // Compare the provided password with the hashed password in the database
          let status = await bcrypt.compare(userData.password, user.password);

          if (status) {
            // If credentials are valid, create a data object with user information
            const data = {
              id: user._id,
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
        console.log(error);
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
        console.log(error);
        reject("Something went wrong on verifying OTP,try again");
      }
    });
  },
  getAllCampaign: () => {
    return new Promise(async (resolve, reject) => {
      try {
        Campaign.find()
          .then((campaigns) => {
            console.log(campaigns);
            resolve(campaigns);
          })
          .catch((err) => {
            reject("Something went wrong on fetching campaigns");
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong on fetching campaigns");
      }
    });
  },
  getCampagin: ({ id }) => {
    return new Promise(async (resolve, reject) => {
      try {
        Campaign.findOne({ _id: new ObjectId(id) })
          .then((campaign) => {
            resolve(campaign);
          })
          .catch((err) => {
            reject("Something went wrong on fetching campaign");
          });
      } catch (error) {
        reject("Something went wrong on fetching campaign");
      }
    });
  },

  // Function to create an order using Razorpay
  createOrder: (amount) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a new instance of Razorpay with the provided API key and secret
        const instance = new Razorpay({
          key_id: process.env.RAZORPAY_KEY,
          key_secret: process.env.RAZORPAY_SECRET,
        });

        // Specify the order options, including the amount and currency
        const options = {
          amount: amount,
          currency: "INR",
        };

        // Create an order using the Razorpay instance and specified options
        const order = await instance.orders.create(options);

        // If the order is successfully created, resolve with the order details
        if (!order) {
          reject("Something went wrong");
        } else {
          const newOrder = new Order({
            order_id: order.id,
            amount: order.amount,
            createdAt: order.created_at,
          });

          newOrder
            .save(newOrder)
            .then((resp) => {
              resolve(order);
            })
            .catch((err) => {
              console.log(err);
              reject("Something went wrong");
            });
        }
      } catch (error) {
        console.log(error);
        // Reject with an error message if there's an exception during the process
        reject("Something went wrong");
      }
    });
  },
  saveDonation: ({
    campaignId,
    amount,
    donorId,
    paymentStatus,
    razorpay_payment_id,
    razorpay_order_id,
  }) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a new Donation instance
        const newDonation = new Donation({
          campaign: campaignId,
          amount: amount,
          donor: donorId,
          paymentStatus: paymentStatus,
          razorpay_payment_id: razorpay_payment_id,
          razorpay_order_id: razorpay_order_id,
        });

        // Save the new donation to the database
        newDonation
          .save(newDonation)
          .then((donation) => {
            resolve("Thank you for donating");
          })
          .catch((err) => {
            console.log(err);
            reject("Something went wrong while saving donation details");
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong while saving donation details");
      }
    });
  },
  fetchDonors: (campaignId) => {
    return new Promise((resolve, reject) => {
      try {
        // Find all donations whose campaignId matches the provided campaignId
        Donation.find({ campaign: new ObjectId(campaignId) })
          .populate({
            path: "donor",
            select: "fullname email createdAt amount", // Specify the fields you want to select from the user document
          })
          .then((donations) => {
            // Extract user details from donations
            const donors = donations.map((donation) => ({
              donorId: donation.donor._id,
              fullname: donation.donor.fullname,
              email: donation.donor.email,
              amount: donation.amount,
              createdAt: donation.createdAt,
            }));
            resolve(donors);
          })
          .catch((err) => {
            console.log(err);
            reject("Error fetching donors by campaign: " + err);
          });
      } catch (error) {
        console.log(error);
        reject("Something went wrong");
      }
    });
  },
  calculateTotalAmountDonated: ({ campaignId }) => {
    return new Promise((resolve, reject) => {
      try {
        // Aggregate the total amount donated across all donations
        Donation.aggregate([
          {
            $group: {
              _id: new ObjectId(campaignId),
              totalAmount: { $sum: "$amount" },
            },
          },
        ])
          .then((result) => {
            // Extract total amount from result
            const totalAmount = result.length > 0 ? result[0].totalAmount : 0;
            resolve(totalAmount);
          })
          .catch((err) => {
            console.log(err);
            reject(
              "Something went wrong while calculating total amount donated"
            );
          });
      } catch (error) {
        console.error(error);
        reject("Something went wrong while calculating total amount donated");
      }
    });
  },
  updateUserDetails: (userId, data, file) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Create a user object with updated data
        let updatedUserData;

        if (data) {
          updatedUserData = {
            fullname: data.fullName,
            email: data.email,
          };
        }
          console.log(file);
        if (file) {
          const currentProfile = await User.findOne({ _id: new ObjectId(userId) });
          await deleteImage(currentProfile.profile);
          updatedUserData.profile = file.filename;
        }

        // Update the user in the database
        User.findOneAndUpdate(
          { _id: new ObjectId(userId) },
          { $set: updatedUserData },
          { new: true }
        )
          .then((result) => {
            if (result) {
              result.password = null;
              console.log(result)
              resolve(result);
            } else {
              reject("User not found or no changes were made");
            }
          })
          .catch((err) => {
            console.error(err);
            reject("Something went wrong while updating user details");
          });
      } catch (error) {
        console.error(error);
        reject("Something went wrong while updating user details");
      }
    });
  },
};
