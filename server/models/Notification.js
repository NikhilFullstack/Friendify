const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    caption:{
            type:String,
        },
    isRead:{
            type:Boolean,
            default:false,
        },
    createdAt:{
            type:Date,
            default: Date.now,
        },
});

module.exports = mongoose.model("Notification",notificationSchema);