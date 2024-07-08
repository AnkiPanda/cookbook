const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const User = require("../models/userModel.js");
const ErrorHandler = require("../utils/errorhandler.js");
const sendToken = require("../utils/jwtToken.js")

exports.registerUser = catchAsyncErrors(async(req,res,next)=>{

    const { name, email, password } = req.body;

    if (!email || !password || !name) {
        return next(new ErrorHandler("Please enter Name, Email & Password, 400"))
    }
    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User alrady exists",400))
    }

    let userData = {
        name,
        email,
        password,
        avatar: {
            public_id: "",
            url: ""
        }
    };

    user = await User.create(userData)

    sendToken(user,201,res)
});

exports.login = catchAsyncErrors(async(req,res,next)=>{
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please enter email & password",400))
    }

    const user = await User.findOne({email}).select("+password")
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401)) 
    }
    sendToken(user,200,res)
})

exports.logout = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
})

exports.updateProfileData = catchAsyncErrors(async(req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email
    }
    const user = await User.findByIdAndUpdate(req.user._id,newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        user
    })
})

exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400)) 
    }

    user.password = req.body.newPassword;
    await user.save({
        validateBeforeSave : false
    })

    sendToken(user,200,res)
})

exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({"email" : req.body.email});

    if(!user){
       return next(new ErrorHandler("User not found",404))
    }

    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave: false})

    const resetPasswordUrl = `${req.peotocol}://${req.get('host')}/api/v2/password/reset/${resetToken}`

    const message = `Your Password reset token is:-  \n \n ${resetPasswordUrl} \n\n If you have not request this Email then, please ignore.`

    
})