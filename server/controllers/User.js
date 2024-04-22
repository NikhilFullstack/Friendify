const User = require("../models/User");
const Like = require("../models/Like");
const Comments = require("../models/Comments");
const Post = require("../models/Post");
const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.getUserProfile = async (req, res) => {
    try {
        const id = req.body.id || req.user.id;
        // console.log("id:", id);
        const userFound = await User.findOne({_id:id});
        if(!userFound){
            return res.status(403).json({
                success: false,
                message: "user Not Found",
            })}
        const userData = await User.findOne({_id:id})
        .populate({
            path:'post',
            populate:{
                path:'userId',
            }
        }).populate({
            path: 'post',
            populater: {
                path: 'like',
            }
        }).populate({
            path: 'post',
            populate: {
                path: 'comments',
            }
        }).populate({
            path: 'post',
            populate: {
                path: 'comments',
                populate: {
                    path: 'userId',
                }
            }
        }).populate({
            path: 'like',
            populate: {
                path: 'userId',
            },
        }).populate({
            path: 'like',
            populate: {
                path: 'postId',
            }
        }).populate({
            path: 'comment',
            populate: {
                path: 'userId',
            },
        }).populate({
            path: 'comment',
            populate: {
                path: 'postId',
            }
        }).populate({
            path: 'comment',
            populate: {
                path: 'reply',
            }
        }).populate({
            path: 'reply',
            populate: {
                path: 'userId',
            },
        }).populate({
            path: 'reply',
            populate: {
                path: 'postId',
            }
        }).populate('additionalDetails').exec();
        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }
        res.status(200).json({
            success: true,
            post: userData,
        })
    }
    catch (err) {
        return res.status(501).json({
            success: false,
            message: err.message,
        })
    }
}



//Get user notification
exports.getAllNotifications = async (req, res) => {
    try {
        const { id } = req.user;
        const userData = await User.findById(id).populate('notification').exec();
        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }
        res.status(200).json({
            success: true,
            notifications: userData.notification
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Fetching Notification",
            error: err.message
        })

    }
}

// {
//     _id: new ObjectId("64c18698cfe68e410f750f22"),
//     firstName: 'Nikhil',
//     lastName: 'Gupta',
//     email: 'gup7nik@gmail.com',
//     password: '$2b$10$BTiOfpwsYfu/bZZCnGCExOIXoCa5tocQdIhezz2RnCxL6eyf3zyMW',
//     contactNumber: 12121,
//     image: 'https://res.cloudinary.com/deh1ips9w/image/upload/v1692194896/NikhilFullstack/biebficdnyu5xvqaflth.jpg',
//     createdAt: 2023-07-26T20:47:55.563Z,
//     post: [
//       new ObjectId("64c187b5cfe68e410f750f4b"),
//       new ObjectId("64d7a0e02ad2e0b747709c86")
//     ],
//     like: [
//       new ObjectId("64c1fc250588061ddc991383"),
//       new ObjectId("64c1fc250588061ddc991389"),
//       new ObjectId("64c1fc270588061ddc99138f"),
//       new ObjectId("64c1fc280588061ddc991395"),
//       new ObjectId("64c1fc290588061ddc99139b"),
//       new ObjectId("64d87baaccaa34b0c59ba4ce")
//     ],
//     comment: [ new ObjectId("64c1fc4b0588061ddc99139f") ],
//     reply: [],
//     friends: [],
//     notification: [],
//     __v: 0,
//     resetPasswordExpires: 2023-08-07T15:38:01.442Z,
//     token: '7503e271-c5d0-4ce4-95d4-b3ab5f465cbf'
//   }

//delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.user;
        const userData = await User.findById(id);
        if (!userData) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }
        // TODO post delete
        console.log(userData.like);
        if( userData.like!== []) {
            const datam=userData.like;
            const likeData = await Like.deleteMany({ _id: { $in: datam } });
        }  
        if( userData.comment!== []) {
            const commentData = await Comments.deleteMany({ _id: { $in: userData.comment } });
        }
        if( userData.post!== []) {
            const postData = await Post.deleteMany({ _id: { $in: userData.post } });
        } 
        await User.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Deleting User",
            error: err.message
        })

    }
}


//GetallUser
exports.getAllUser = async (req, res) => {
    try {
        const AllUserData = await User.find({}).populate({
            path:'post',
            populate:{
                path:'userId',
            }
        }).populate({
            path:'like',
            populate:{
                path:'userId',
            }
        }).populate({
            path:'like',
            populate:{
                path:'postId',
            }
        }).populate({
            path:'comment',
            populate:{
                path:'userId',
            }
        }).populate({
            path:'comment',
            populate:{
                path:'postId',
            }
        }).populate({
            path:'comment',
            populate:{
                path:'reply',
            }
        }).populate({
            path:'reply',
            populate:{
                path:'userId',
            }
        }).populate({
            path:'reply',
            populate:{
                path:'postId',
            }
        }).populate("friends").populate("notification");
        if (!AllUserData) {
            return res.status(401).json({
                success: false,
                message: "User Not Found",
            });
        }
        res.status(200).json({
            success: true,
            AllUserData,
            message:"All user data is given",
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Error in Fetching All User",
            error: err.message
        })
    }
}

//UpdateProfile
exports.updateProfile = async (req, res) => {
    try {
        // fet data and userid
        const { firstName,
                lastName,
                contactNumber } = req.body;
                // console.log(req.user)
        const id = req.user.id;  // login ke tym
        //validation
        // console.log(firstName, lastName, contactNumber, req.user.email, id);
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Id is required"
            });
        }
        //find profile
        const userDetails = await User.findById(id);

        // update profile
        userDetails.firstName = firstName ? firstName : userDetails.firstName;
        userDetails.lastName = lastName ? lastName : userDetails.lastName;
        userDetails.contactNumber = contactNumber ? contactNumber : userDetails.contactNumber;

        await userDetails.save();
        userDetails.password = undefined;
        // return response
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            userDetails,
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}





//updateProfilepicture
exports.updateDisplayPicture = async (req, res) => {
    try {
        // console.log(req.files.displayPicture);
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        // console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};


//update additional details
exports.updateAdditionalDetails = async (req, res) => {
    try {
        // fet data and userid
        const { dateOfBirth = "", about = "", bloodGrp = "", contactNumber, gender } = req.body;
        const id = req.user.id;  // login ke tym
        //validation
        // console.log(contactNumber, gender, id);
        if (!contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        //find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await additionalDetails.findById(profileId);

        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.contactNumber = contactNumber;
        profileDetails.bloodGrp = bloodGrp;
        profileDetails.gender = gender;
        profileDetails.about = about;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success: false,
            message: "Profile updated successfully",
            profileDetails,
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        })

    }
}

//search user

exports.searchUser = async (req,res)=>{
    try {
        const search = req.body.search ? {
            $or: [
                {firstName: {$regex: req.body.search, $options: "i"}},
                {lastName: {$regex: req.body.search, $options: "i"}},
                {email: {$regex: req.body.search, $options: "i"}},
            ],
        } : {};
        // console.log(req.body.search,req.user);
        const user = await User.find(search).find({_id: { $ne: req.user.id }});
        return res.status(200).json({
            success:true,
            user,
            message:'Search completed',
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}
