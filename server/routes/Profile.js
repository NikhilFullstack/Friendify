const express = require("express");
const router = express.Router();

    const { getUserProfile,
        //     getAllNotifications,
            deleteUser,
            getAllUser,
            updateProfile, 
            updateDisplayPicture,
            searchUser} = require("../controllers/User");
    const { createComment,
            updateComment,
            deleteComment,
            createReply,
            updateReply,
            deleteReply } = require("../controllers/Comments");

    const{ auth}= require("../middleware/Auth");
    router.post("/getUserProfile",auth,getUserProfile);
//     router.get("/getAllUserPost",auth,getAllUserPosts);
//     router.get("/getUserNotification",auth,getAllNotifications);
    router.delete("/deleteUser",auth,deleteUser);
    router.get("/getAllUser",auth,getAllUser);
    router.put("/updateProfile",auth,updateProfile);
    router.put("/updateProfilePicture",auth,updateDisplayPicture);
    

    router.post("/createComment",auth,createComment);
    router.put("/updateComment",auth,updateComment);
    router.delete("/deleteComment",auth,deleteComment);
    router.post("/createReply",auth,createReply);
    router.put("/updateReply",auth,updateReply);
    router.delete("/deleteReply",auth, deleteReply);
    router.post("/searchUser",auth,searchUser);


    
// Export the router for use in the main application
    module.exports = router

 