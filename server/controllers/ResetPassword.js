
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const base64url = require('base64url');
require("dotenv").config();

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from req body
        const email = req.body.email;
        //check user for this email , email validation
        const user = await User.findOne({email: email});
        if(!user) {
            return res.json({success:false,
            message:'Your Email is not registered with us'});
        }
        //generate token 
        const token  = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate(
                                        {email:email},
                                        {
                                            token:token,
                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                        },
                                        {new:true});
        //create url
        const url = `https://friendify-frontend.vercel.app/update-password/${token}`
        //send mail containing the url
        await mailSender(email, 
                        "Password Reset Link",
                        `Password Reset Link: ${url}`);
        //return response
        return res.json({
            success:true,
            message:'Email sent successfully, please check email and change pwd',
        });
    }
    catch(error) {
        // console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }



   
}



//change password
// exports.resetPassword = async (req,res)=>{
//     try{
//         //get data from user
//         const { password, 
//                 confirmPassword,token} = req.body;
        

//         //validate the data
//         if( password !== confirmPassword){
//             return res.status(402).json({
//                 success:false,
//                 message:"Enter all Input details carefully",
//             });
//         }
//         //now verify token
//         try{
//            if( await jwt.verify(token,process.env.JWT_SECRET)){

//             //fetch user from Db
//             console.log("token verified")
//             // console.log(req.params);
//             let payload =await jwt.decode(token);
//             console.log("payload:",payload);
//             // const user =await User.findOne({email: payload.email});
//             // console.log("user:",user);
//             //hash the password
//             const hashpassword =await bcrypt.hash(password,10);
//             //save the new password in db
//             await User.findOneAndUpdate(
//                 {email:payload.email},
//                 {$set:{
//                     password:hashpassword}
//                 },
//             ).exec();
//             //send mail that password updated
//             const title = "Password Changed Successfully";
//             const body = "We have changed your login password as you have requested.";
//             await mailSender(payload.email,title,body);
//             return res.status(200).json({
//                 success:true,
//                 message:"Password Changed Successfully",
//             });
//         }
//         else{
//             return res.status(402).json({
//                 success:false,
//                 message:'JSON web token expired',
//             })
//         }
//         }
//         catch(err){
//             return res.status(401).json({
//                 success:false,
//                 message:err.message,
//             })
//         }
//     }
//     catch(err){
//         console.error(err);
//         console.log("Error in Change Password",err);
//         return res.status(500).json({
//             success:false,
//             message:err.message,
//         })
//     }
// }

exports.resetPassword = async (req, res) => {
	try {
		const { password, confirmPassword, token } = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}
		const userDetails = await User.findOne({ token: token });
		if (!userDetails) {
			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}
		if (!(userDetails.resetPasswordExpires > Date.now())) {
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		await User.findOneAndUpdate(
			{ token: token },
			{ password: encryptedPassword },
			{ new: true }
		);
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
};