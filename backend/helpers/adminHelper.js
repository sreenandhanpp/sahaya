const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require('../MongoDb/models/userModels/User')
const bcrypt = require('bcrypt');

module.exports = {
    //To get all user details,then resolve the data
    fetchUsers: () => {
        return new Promise(async (resolve, rejcet) => {
            const users = await User.find({}).lean();
            resolve(users);
        });
    },
    //To find One user details,then resolve the data
    getUserDetails: (user_id) => {
        return new Promise(async (resolve, reject) => {
            //matching the user id with mongodb object id 
            User.findOne({ _id: new ObjectId(user_id) }).lean().then((user) => {
                resolve(user);
            }).catch(err=>{
                reject(err);
            })
        })
    },
    //To update the user details 
    updateUserDetails: (user_id, userDetails) => {
        return new Promise(async (resovle, reject) => {
            // bcrypting the password with bcrypt library which convert the password into a hex value
            userDetails.password = await bcrypt.hash(userDetails.password,10);
            User.updateOne({ _id: new ObjectId(user_id) }, {
                $set: {
                    fullname: userDetails.fullname,
                    address : userDetails.address,
                    phone: userDetails.phone,
                    username: userDetails.username,
                    email: userDetails.email,
                    password: userDetails.password,
                    isAdmin:false
                }
            }).then(()=>{
                resovle("User details updated Successfully");
            }).catch(err => {
                reject(err)
            })
        });
    },
    //To Delete the user Details
    deleteUser : (user_id) => {
        return new Promise(async (resolve,reject) => {
            User.deleteOne({ _id:new ObjectId(user_id)}).then((res)=>{
                resolve("User deteleted successfully");
            });
        })
    }
}