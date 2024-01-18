const express = require("express")
const router = express.Router();

const {createPost,getAllPost,getSinglePost,updatePost,deletePost} = require('../controllers/Post');
const { auth } = require("../middleware/Auth");
const { createLike, 
        deleteLike }=require("../controllers/Like");
// Route for create Post
router.post('/createPost',auth,createPost);

// Route for get All post
router.get('/getAllPost',auth,getAllPost);

router.post('/getSinglePost',auth,getSinglePost);




// Route for get post like
// router.get('/getPostLike',auth,getPostLike);

// // Route for get post comments
// router.get('/getPostComments',auth,getPostComments);

// Route for update Post
router.put('/updatePost',auth,updatePost);

// Route for delete Post
router.delete('/deletePost',auth,deletePost);

//Like a post
router.post('/likePost',auth, createLike);

//Unlike a post
router.delete('/unlikePost',auth, deleteLike);


// Export the router for use in the main application
module.exports = router