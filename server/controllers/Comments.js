const User = require("../models/User");
const Post = require("../models/Post");
const Comments = require("../models/Comments");
const Reply = require("../models/Reply");

//create comment
exports.createComment = async (req,res)=>{
    try{
        const {postId,caption}=req.body;
        const userId = req.user.id;
        if(!userId || !postId || !caption){
            console.log("user:",userId,"post:",postId,"caption:",caption);
            return res.status(401).json({
                success:false,
                message:'Information insufficient',
            })
        }
        const comment = await Comments.create({
            userId,
            postId,
            caption,
        });
        await User.findByIdAndUpdate(userId, { $push: { comment: comment._id } }, { new: true } );
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }, { new: true });
        return res.status(200).json({
            success:true,
            message:"Comment created successfully",
        })

    }
    catch(err){
        res.status(500).json({
            success:'true',
            message:'Comment created successfully',
        })
    }
}







//update comment

exports.updateComment = async (req,res)=>{
    try{
        const {  commentId,
                 caption    }=req.body;
        //ho sakta hn params se request leni parh jaye
        const updateC = await Comments.findByIdAndUpdate(commentId,{$set:{caption:caption}},{new:true}).exec();
        
        return res.status(200).json({
                success:true,
                message:'Caption updated successfully',
            });

    }
    catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}



//delete comment
exports.deleteComment = async (req,res)=>{
    try{
        var {commentId} = req.body;
        //req.params se bhi le sakte hn
        console.log("1");
        const comment = await Comments.findById(commentId);
        console.log("1");
        await Post.findByIdAndUpdate(comment.postId,{$pull:{comments:commentId}});
        console.log("1");
        await User.findByIdAndUpdate(comment.userId,{$pull:{comment:commentId}});
        console.log("1");
        await Comments.findByIdAndDelete(commentId);
        return res.status(200).json({
            success:true,
            message:'Comment successfully deleted',
        });
    }
    catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}



//add reply
exports.createReply = async (req,res)=>{
    try{
        const{postId,
              caption, 
              commentId } = req.body;
        const userId = req.user.id;
        //validate
        if(!userId || !postId || !caption || !commentId){
            console.log("1",userId,"2",postId,"3",caption,"4",commentId);
            return res.status(402).json({
                success:false,
                message:'All details are reqquired',
            });
        }
        const reply = await Reply.create({
            userId,
            postId,
            caption,
            commentId,
        });
        await Comments.findByIdAndUpdate(commentId,{$push:{reply:reply._id}},{new:true});
        await User.findByIdAndUpdate(userId,{$push:{reply:reply._id}},{new:true});
        await Post.findByIdAndUpdate(postId,{$push:{reply:reply._id}},{new:true});
        return res.status(200).json({
            success:true,
            message:'Comment successfully created',
        });
    }
    catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}


//update reply
exports.updateReply = async (req,res)=>{
    try{
        const {replyId,caption}=req.body;
        if(!replyId ){
            return res.status(302).json({
                success:false,
                message:"replyId required",
            })
        }
        await Reply.findByIdAndUpdate(replyId,{$set:{caption:caption}},{new:true}).exec();
        return res.status(200).json({
            success:true,
            message:'Reply successfully updated',
        })
    }
    catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}

//delete reply
exports.deleteReply = async (req,res)=>{
    try{
        const {replyId} = req.body;
        //validate
        if(!replyId){
            return res.status(401).json({
                    success:false,
                    message:'replyId invalid',
                })
        }
        const reply = await Reply.findById(replyId);
        await User.findByIdAndUpdate(reply.userId,{$pull:{reply:replyId}});
        await Post.findByIdAndUpdate(reply.postId,{$pull:{reply:replyId}});
        await Reply.findByIdAndDelete(replyId);
        return res.status(200).json({
            success:true,
            message:'Reply deleted Successfully',
        });
    }
    catch(err){
        res.status(500).json({
            success:'false',
            message:err.message,
        })
    }
}


