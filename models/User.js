const mongoose = require('mongoose');
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()


const userShema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required:true, 
    unique:true
  },
  username: { 
    type: String, 
    required:true, 
    unique:true
  },
  email: { 
    type: String, 
    required:true, 
    unique:true 
  },
  password: {
    type: String, 
    required:true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  img: {
    type:String
  },
 },
 {timestamps: true}
);

userShema.pre("save", async function(next){
  if(!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
})

userShema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password);
}

userShema.methods.generateAccessToken = async function (){
  return jwt.sign(
      {
          _id: this._id,
          email: this.email,
          username: this.username,
          fullName: this.fullName
      },
      process.env.SECRET_ACCESS_TOKEN,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

userShema.methods.generateRefreshToken = async function(){
  return jwt.sign(
      {
          _id: this._id
      },
      process.env.SECRET_REFRESH_TOKEN,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}

const User = mongoose.model('User', userShema);
module.exports = User;