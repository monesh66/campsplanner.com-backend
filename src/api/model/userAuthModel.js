const mongoose = require('mongoose');


const adminUserSchema = new mongoose.Schema({

    id:{type: Number},
    email:{type: String},
    username:{type: String},
    password:{type: String},
    userType:{type: String}
})

// const emailUserSchema = new mongoose.Schema({

//     id:{type: Number},
//     email:{type: String},
//     name:{type: String},
//     userType:{type: String}
// })

const adminUserModel = mongoose.model("userLogin", adminUserSchema);
//const emailUserModel = mongoose.model("emailLogin", emailUserSchema);




//exports
module.exports = {adminUserModel};