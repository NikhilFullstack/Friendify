const mongoose=require("mongoose");
 const likeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    createdAt:{
        type:Date,
        default:()=>new Date(),
    },
 });

 module.exports = mongoose.model("Like",likeSchema);