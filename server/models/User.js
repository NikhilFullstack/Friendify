const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true,
    },
    image:{
        type:String,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    post:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }],
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply",
    }],
    friends:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    notification:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Notification",
    }],
    token :{
        type:String,
    },
    resetPasswordExpires: {
        type:Date,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"additionalDetails",
    },

})
module.exports = mongoose.model("User",userSchema);