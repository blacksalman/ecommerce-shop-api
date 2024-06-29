const router = require("express").Router();
const { getAllCartItem, getCartItem, createCart, updateCartById, deleteCartById  } = require("../controllers/cart.controller.js");


router.route("/all").get(getAllCartItem);

router.route("/find/:userId").get(getCartItem);

router.route("/create_cart").post(createCart);

router.route("/:id").put(updateCartById);

router.route("/deleteItem/:id").delete(deleteCartById);



module.exports = router;