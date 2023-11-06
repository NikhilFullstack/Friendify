const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
// const additionalDetails = require("../models/additionalDetails");
// const Post =require("../models/Post");
// const Like = require("../models/Like");
// const Comments =require("../models/Comments");
// const Notification = require("../models/Notification");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const mailSender = require("../utils/mailSender");

//Send Otp
exports.sendOTP = async (req,res)=>{
    try{
        const {email} = req.body;
         // check if user already existed
         if(!email){
            return res.status(401).json({
                success:false,
                message:"Email Id required",
            })
         }
         const userexist =await  User.findOne({email});
         //if user already existed then return a response
        //  console.log(userexist);
         if(userexist){
            return res.status(403).json({
                success:false,
                message:"User already Registered Lala",
            })
         }
         //generate OTP
         var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
         })
        //  console.log("Otp Generated ",otp);
         let result =await OTP.findOne({otp: otp});
         while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result=await OTP.findOne({otp: otp})
         }
         const otpPayload ={email,otp};
         const otpBody =await OTP.create(otpPayload);
        //  console.log(otpBody);
         return res.status(200).json({
            success:true,
            message:"Otp send to email successfully",
         })

    }
    catch(err){
        // console.error(err);
        // console.log("Error in mail verification",err);
        return res.status(500).json({
            success:false,
            message:"Error in mail OTP verification",
        })
    }
}

//signup
exports.signup = async (req,res)=>{
    try{
        //take data
        const { firstName,
                lastName, 
                email,
                password,
                confirmPassword,
                contactNumber, 
                otp
              }                 = req.body;
            //validate kro
            if(!firstName || !lastName || !email || !password || ! confirmPassword ||
                !contactNumber || !otp){
                    return res.status(403).json({
                        success:false,
                        message:"All fields are required",
                    })
                }
            //2 password same?
            if(password !== confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"Password Mismatch",
                })
            }
            //check if user already registered
            const userexist=await User.findOne({email});
            if(userexist){
                return res.status(403).json({
                    success:false,
                    message:"Email already registered",
                })
            }
            //find most resent otp stored for the user
            const resentOtpStored =await OTP.findOne({email:email}).sort({createdAt:-1}).limit(1);
            // console.log("otp strore",resentOtpStored);
            if(!resentOtpStored){
                return res.status(400).json({
                    success:false,
                    message:"Otp not found",
                });
            }
            // console.log("resentOtpStored:",resentOtpStored,resentOtpStored.otp);
            //validateOtp
            // console.log(otp)
            if(resentOtpStored.otp.length==0){
                //otp not found
                return res.status(400).json({
                    success:false,
                    message:"Otp not found",
                });
            }
            else if(resentOtpStored.otp !== String(otp)){
                
                return res.status(400).json({
                    success:false,
                    message:"Invalid Otp",
                })
            }
            //hashed Password
            const hashedPassword =await bcrypt.hash(password,10);
             //entry create in db
            //  const additional = await additionalDetails.create({
            //     gender:null,
            //     dateOfBirth:null,
            //     about:null,
            //     contactNumber:null,
            //  });
            //  const postId = await Post.create({
            //     caption:null,
            //     media:[],
            //     userId:null,
            //     createdAt:null,
            //     location:null,
            //     like: [],
            //     comments: [],
            //  });
            //  const likeId= await Like.create({
            //     userId:null,
            //     postId:null,
            //     createdAt:null,
            //  });
            //  const commentsId = await Comments.create({
            //     userId:null,
            //     postId:null,
            //     caption:null,
            //     createdAt:null,
            //     reply:[],
            //  });
             
            //  const NotificationId = await Notification.create({
            //     userId:null,
            //     caption:null,
            //     isRead:null,
            //     createdAt:null,
            //  })

             const user = await User.create({
                firstName,
                lastName,
                email,
                password:hashedPassword,
                contactNumber:contactNumber,
                image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
                // post:postId._id,
                // like:likeId._id,
                // comments:commentsId._id,
                // notification:NotificationId._id,
                // additionalDetails:additional._id,
             });
             return res.status(200).json({
                success:true,
                message:"Sign up Successful",
                user,
             })



    }
    catch(err){
        // console.log("Error in signing up",err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}
//login


exports.login = async (req,res)=>{
    try{
        //take email and password
        const {email, password} = req.body;
        //validate karenge
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Both Email and password are required",
            });
        }
        //email varify kro bd se
        //Yaha pr or kaam hona hn
        const existedEmail=await User.findOne({email});
        if(!existedEmail){
            return res.status(401).json({
                success:false,
                message:"Email Id is not registered",
            });
        }
        //Take Password from db
        const dbPasswrd = existedEmail.password;
        //compare db Hashed password with user entered passwrd
        if(await bcrypt.compare(password,dbPasswrd)){
            const payload = {
                email:email,
                id:existedEmail._id,
            };
            const token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2592000000",
            });
            existedEmail.token = token;
            existedEmail.password = undefined;
            // create cookie and send response
            const options = {
                expires: new Date(Date.now()+2592000000),
                httpOnly:true,
            };
            // existedEmail.save();
            // console.log(existedEmail)
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                existedEmail,
                message:"logged in successfully",
            })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Wrong Password",
            })
        }
        
    }
    catch(err){
        // console.error(err);
        // console.log("Error in login",err);
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}



