const mongoose=require("mongoose");
 const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    caption:{
        type:String,
        trim:true,
    },
    createdAt:{
        type:Date,
        default:new Date,
    },
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply",
    }]
 });

 module.exports = mongoose.model("Comments",commentSchema);