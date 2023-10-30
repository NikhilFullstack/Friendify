const { json } = require("express");
const Post = require("../models/Post")
const User = require("../models/User");
const mongoose = require("mongoose");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create post
exports.createPost = async (req, res) => {
    try {
      // Get user ID from request object
      const userId = req.user.id
  
      // Get all required fields from request body
      let {
        caption,
        location,
      } = req.body
      // Get thumbnail image from request files
      const thumbnail = req.files.media
  
      // Check if any of the required fields are missing
      if (
        !caption ||
        !location ||
        !thumbnail 
      ) {
        // console.log(caption,location,thumbnail);
        return res.status(400).json({
          success: false,
          message: "All Fields are Mandatory",
        })
      }
    //   if (!status || status === undefined) {
    //     status = "Draft"
    //   }
      // Check if the user is not present or attack on the server
      const userDetails = await User.findById(userId)
  
      if (!userDetails) {
        return res.status(404).json({
          success: false,
          message: "User Details Not Found",
        })
      }
  
      // Upload the Thumbnail to Cloudinary
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
    //   console.log(thumbnailImage)
      // Create a new course with the given details
      const newPost = await Post.create({
        caption,
        location,
        media: thumbnailImage.secure_url,
        userId: userId,
        // status: status,
        // instructions,
      })
  
      // Add the new course to the User Schema of the Instructor
      await User.findByIdAndUpdate(
        {
          _id: userDetails._id,
        },
        {
          $push: {
            post: newPost._id,
          },
        },
        { new: true }
      )
      
      // Return the new course and a success message
      res.status(200).json({
        success: true,
        data: newPost,
        message: "Post Created Successfully",
      })
    } catch (error) {
      // Handle any errors that occur during the creation of the course
    //   console.error(error)
      res.status(500).json({
        success: false,
        message: "Failed to create Post",
        error: error.message,
      })
    }
  }





//getallpost
exports.getAllPost = async (req,res)=>{
    try{
        const posts = await Post.find({}).populate(
            {
                path:"like",
                populate:{
                    path:"userId",
                }
            }
        ).populate(
            {
                path:"comments",
                populate:{
                    path:"reply",
                }
            }
        ).populate(
            {
                path:"comments",
                populate:{
                    path:"reply",
                    populate:{
                        path:"userId"
                    }
                }
            }
        ).populate(
            {
                path:"comments",
                populate:{
                    path:"userId",
                }
            }
        ).populate({path:'userId'}).exec();
        // console.log("All Posts:",posts);
        return res.status(200).json({
            success:true,
            posts,
            message:'All posts are fetched successfully',
        });

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

// getSinglePost
exports.getSinglePost = async (req,res)=>{
  try{
      const id = req.body.id;

      console.log(":Id AA gyi::::",id,req);
      if(!id){
        return res.status(403).json({
          success:false,
          message:'PostId Missing',
      })
      }
      const posts = await Post.findById({_id:id}).populate(
          {
              path:"like",
              populate:{
                  path:"userId",
              }
          }
      ).populate(
          {
              path:"comments",
              populate:{
                  path:"reply",
              }
          }
      ).populate(
          {
              path:"comments",
              populate:{
                  path:"reply",
                  populate:{
                      path:"userId"
                  }
              }
          }
      ).populate(
          {
              path:"comments",
              populate:{
                  path:"userId",
              }
          }
      ).populate({path:'userId'}).exec();
      // console.log("All Posts:",posts);
      return res.status(200).json({
          success:true,
          posts,
          message:'Single Post is fetched successfully',
      });

  }
  catch(err){
      return res.status(500).json({
          success:false,
          message:err.message,
      })
  }
}

//get post like




//update post
exports.updatePost = async (req,res)=>{
    try{
        const{caption, media, location}= req.body;
        const postId = req.body.postId || req.params.id;
        if(!postId){
            return res.status(302).json({
                success:false,
                message:'PostId missing',
            })
        }
        // console.log("ew ",req)
        const post = await Post.findOne({_id:postId});
        // console.log("post is:",post);
        if(caption){
            const postInstance = await Post.findOneAndUpdate({_id: postId }, { caption: caption }, { new: true });
            if(!postInstance){
                // console.log(postInstance)
                return res.status(302).json({
                    success:false,
                    message:'Post not found',
                })
            }
        }
        if(location){
            const postInstance = await Post.findOneAndUpdate({ _id: postId }, { location: location }, { new: true });
            if(!postInstance){
                // console.log(postInstance)
                return res.status(302).json({
                    success:false,
                    message:'Post not found',
                })
            }
        }
        if(media){
            const postInstance = await Post.findOneAndUpdate({ _id: postId }, { media: media }, { new: true });
            if(!postInstance){
                // console.log(postInstance)
                return res.status(302).json({
                    success:false,
                    message:'Post not found',
                })
            }
        }
        return res.status(200).json({
            success:true,
            message:'Post successfully updated',
        })

    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
               }
}

//delete post
exports.deletePost = async (req,res)=>{
    try{
        // console.log(req.body.postId);
        
        // if(!req.boby.postId){
        //     return res.status(401).json({
        //         success:false,
        //         message:'PostId is missing'
        //     })
        // }
        // console.log("1")
        const postIdd=await req.body.postId;
        const post = await Post.findOne({_id:`${postIdd}`});
        // console.log("2")
        await User.findByIdAndUpdate({_id:post.userId},{$pull: {post:req.body.postId}},{new:true})
        // console.log("3")
        await Post.findByIdAndDelete({_id:req.body.postId});
        // console.log("4")
        return res.status(200).json({
            success:true,
            message:'Post successfully deleted'
        })
    }
    catch(err){
        // console.log(req.body.postId)
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}