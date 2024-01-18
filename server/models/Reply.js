const mongoose=require("mongoose");
 const replySchema = new mongoose.Schema({
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
        default:new Date(),
    },
    commentId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments",
    }],
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Reply",
    }]
 });

 module.exports = mongoose.model("Reply",replySchema);