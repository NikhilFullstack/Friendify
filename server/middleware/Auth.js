const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        console.log("Now token verification begens")
        //verify the token
        try{
            const decode =await  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:err.message,
            });
        }
        console.log("auth varified");
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:error.message,
        });
    }
}

exports.authz = async (req, res) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'Token is missing',
            });
        }
        console.log("Now token verification begens")
        //verify the token
        try{
            const decode =await  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:err.message,
            });
        }
        console.log("auth varified");
        return res.status(200).json({
            success:true,
            message:'User Verified',
        })
        // next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:error.message,
        });
    }
}