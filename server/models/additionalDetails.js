const mongoose = require("mongoose");

const additionalDetailsSchema = new mongoose.Schema({
    gender: {
        type:String,
    },
    dateOfBirth: {
        type:String,
    },
    about: {
        type:String,
    },
    contactNumber: {
        type:Number,
    },
    bloodGrp: {
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
});

module.exports = mongoose.model("additionalDetails",additionalDetailsSchema);