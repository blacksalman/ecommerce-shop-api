const router = require("express").Router();
const {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    getMonthlyIncome
} = require("../controllers/order.controller.js");


router.route("/all_order").get(getAllOrder);

router.route("/find_order/:userId").get(getOrderById);

router.route("/order_income").get(getMonthlyIncome);

router.route("/create_order").post(createOrder);

router.route("/:id").put(updateOrderById);

router.route("/deleteOrder/:id").delete(deleteOrderById);



module.exports = router;