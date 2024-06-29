const User = require("../models/User");
const jwt = require("jsonwebtoken");


const generateAccessAndRefreshToken = async(userId) => {
    try {
       const user = await User.findById(userId);
       const accessToken = await user.generateAccessToken();
       const refreshToken = await  user.generateRefreshToken();
       user.refreshToken = refreshToken;
       await user.save({ validateBeforeSave: false });

       return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something Went Wrong while generating access and refresh token");
    }
}

const registerUser = async (req, res) => {
    const { fullName, username, email, password, } = req.body;

    if([fullName, username, email, password].some((field)=> field?.trim() === "")){
        return res.status(500).json({message: "All fields are required"});
    }

    const existedUser = await User.findOne({
        $or: [{email}, {username}]
    })

    if(existedUser){
        return res.status(409).json({message: "User with this email or username already exists"});
    }

    const user = await User.create({
        fullName,
        username: username.toLowerCase(),
        email,
        password,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser){
        return res.status(500).json({message: "Something went wrong while register user", status: false});
    }

    return res.status(201).json({message: "user register successfully", createdUser, status: true});
};


const loginUser =  async (req, res) => {
    const { email, password } = req.body;

    if(!email && !password){
        return res.status(400).json({message: "username and email are required"});
    }

    const user = await User.findOne({email});

    if(!user){
        return res.status(404).json({message: "User does not exist."});
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        return res.status(401).json({message: "Invalid user credentials"});
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);


    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const option = {
        HttpOnly: true,
        Secure: true,
    }

    res.cookie('accessToken', accessToken, option);
    res.cookie('refreshToken', refreshToken, option);


    // .cookie("accessToken", accessToken, option)
    // .cookie("refreshToken", refreshToken, option)

    return res
    .status(200)
    .json({ message:"User Logged In Successfully", user: loggedInUser, accessToken, refreshToken })


};

const getCurrentUser =  async (req, res) => {
    console.log("req", req.user)
    return res
    .status(200)
    .json({data: req.user, message:"User Fetched Successfully"})
};



module.exports = {
    registerUser,
    loginUser,
    getCurrentUser
}