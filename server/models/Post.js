const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        trim: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    media:[{
        type:String,
    }],
    createdAt:{
        type:Date,
        default: Date.now(),
    },
    location:{
        type:String,
    },
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like",
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }]
})
module.exports = mongoose.model("Post",postSchema);