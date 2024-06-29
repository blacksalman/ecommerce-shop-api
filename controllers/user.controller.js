const User = require("../models/User");


//UPDATE USER
const updateUserAccountDetails = async (req, res) =>{
    const { fullName, email } = req.body;

    if(!fullName || !email) {
       return res.status(400).json({message: "All fields are required", status: false});
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,
                email
            }
        },
        {
            new: true
        }
    ).select("-password")

    return res
    .status(200)
    .json({message: "Account Details Updated Successfully",  user, status: true });
}


// CHANGE PASSWORD
const changeCurrentPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
       return res.status(400).json({message: "Invalid old password", status: false});
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json({message:"Password Changed Successully"});
};

const logoutUser =  async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )

    const option = {
        HttpOnly: true,
        Secure: true,
    }

    return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json({message:"user logged out"})
};


//DELETE USER
const deleteUserById = async (req, res) =>{
    try {
        const userDeleted = await User.findByIdAndDelete(req.params.id);
        if(!userDeleted){
            return res.status(400).json({message: "failed to delete user", status: false});
        }
        return res.status(200).json({message: "User has been deleted...", userDeleted, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}





// //GET USER STATS
const userStats = async (req, res) =>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: 1 },
                },
            },
        ]);
        if(!data){
            return res.status(400).json({message: "failed to fetch stats", status: false});
        }
        res.status(200).json({message: "user stat fetched successfully", data, status: true})
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    updateUserAccountDetails,
    changeCurrentPassword,
    logoutUser,
    deleteUserById,
    userStats,
};