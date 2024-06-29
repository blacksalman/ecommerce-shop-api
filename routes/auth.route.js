const router = require("express").Router();
const { registerUser, loginUser, getCurrentUser } = require("../controllers/auth.controller.js");
const verifyJWT = require("../middleware/auth.middleware.js");


router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/getCurrent-user").get(verifyJWT, getCurrentUser)

module.exports = router;