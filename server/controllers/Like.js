const User = require("../models/User");
const Like = require("../models/Like");
const Post = require("../models/Post");
//create like
exports.createLike = async (req,res)=>{
    try{
        //req body
        const { postId }= req.body;
        const userId = req.user.id
        //Validate
        if(!userId || !postId)
        {
            // console.log('userId or postId is missing',userId,postId);
            return res.status(401).json({
                success:false,
                message: 'userId or postId is missing',
            })
        }
        // console.log("Testing for existing User");
            const existUser = await User.findOne({_id:userId});
        // console.log("Testing for existing User-POST",existUser);
            const temp = await Post.findById(postId);
        // console.log("Testing for existing Post",temp);

        const likePost = await Like.create({
            userId,
            postId,
        });
        const payload = {
            userId:userId,
            postId:postId,
            likeId:likePost._id,
        }
        await User.findByIdAndUpdate(userId,{$push:{like:likePost._id}});
        await Post.findByIdAndUpdate(postId,{$push:{like:likePost._id}});
        return res.status(200).json({
            success:true,
            payload,
            message:'Post is successfully Liked',
        });


    }
    catch(err){
        // console.log("Error in Like:",err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}





//delete like
exports.deleteLike = async (req,res) =>{
    const {likeId} = req.body;
    //validation
    if(!likeId){
        return res.status(401).json({
            success:false,
            message:'LikeId is not found',
        })
    }
    // console.log("Searching for like Id");
    const like = await Like.findById(likeId);
    // console.log("like is searched",like);
    if(like === null){
        return res.status(402).json({
            success:false,
            message:'LikeId not found',
        })
    }
    // Find the user document and remove the likeId from the like array
    await User.findByIdAndUpdate(like.userId, { $pull: { like: like._id } }, { new: true });
    // Find the post document and remove the likeId from the like array
    await Post.findByIdAndUpdate(like.postId, { $pull: { like: like._id } }, { new: true });
    //Now delete like via likeId
    await Like.findByIdAndDelete(like._id);
      return res.status(200).json({
        success:true,
        message:'Like deleted successfully',
      });
}




