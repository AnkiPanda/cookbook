const catchAsyncErrors = require('./catchAsyncErrors.js');
const ErrorHandler = require("../utils/errorhandler.js")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel.js")


exports.isAuthenticatedUser = catchAsyncErrors(async(req,res,next)=>{

    console.log(req.cookies)
    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler("You need to Login to access this",401))
    }

    const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    console.log(decodedData)
    req.user = await User.findById(decodedData.id)
    console.log(req.user._id)

    next()
})

exports.autherizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this`, 403))
        }
        next();
    }
}