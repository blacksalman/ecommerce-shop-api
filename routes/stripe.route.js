const router = require("express").Router();
const { stripePayment } = require("../controllers/stripe.controller.js");

router.route("/payment").post(stripePayment);



module.exports = router;