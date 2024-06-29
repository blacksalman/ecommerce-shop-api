const router = require("express").Router();
const {
    updateUserAccountDetails,
    changeCurrentPassword,
    logoutUser,
    deleteUserById,
    userStats,
} = require("../controllers/user.controller.js");

const verifyJWT = require("../middleware/auth.middleware.js");


router.route("/user_stats").get(userStats);

router.route("/change_password").post(verifyJWT, changeCurrentPassword);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/update-account-details").patch(verifyJWT, updateUserAccountDetails);

router.route("/deleteUser/:id").delete(verifyJWT, deleteUserById);



module.exports = router;