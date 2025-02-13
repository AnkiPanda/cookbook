const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require ('crypto')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your Name"],
        maxLength: [30, "Name Cannot exceed 30 characters"],
        minLength: [4, "Name should have atleast 4 characters"]
    },
    email:{
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid Email"]
    },
    password:{
        type: String,
        required: [true, "Please Enter Password"],
        minLength: [8, "Password should have atleast 8 characters"],
        select: false
    },
    avatar: {
        public_id: {
            type: String
        },
        url:{
            type: String
        }
    },
    role: {
        type: String,
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
         next()
    }
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJWTToken = function() {
    return jwt.sign({id: this._id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.methods.getResetPasswordToken = function(){

    const resetToken = crypto.randomBytes(20).toString('hex')

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
}

module.exports = mongoose.model("User",userSchema)