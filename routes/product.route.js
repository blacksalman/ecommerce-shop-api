const router = require("express").Router();
const {
    getAllProduct,
    getProductById,
    createProduct,
    updatedProductProductById,
    deleteProductById
} = require("../controllers/product.controller.js");

const verifyJWT = require("../middleware/auth.middleware.js");


router.route("/all_product").get(getAllProduct);

router.route("/find_product/:id").get(getProductById);

router.route("/create_product").post(createProduct);

router.route("/:id").put(verifyJWT, updatedProductProductById);

router.route("/deleteProduct/:id").delete(deleteProductById);



module.exports = router;