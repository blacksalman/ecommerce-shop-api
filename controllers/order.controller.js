const Order = require("../models/Order");


//GET ALL ORDER
const getAllOrder = async (req, res) => {
    try {
        const orders = await Order.find();
        if(!orders){
           return res.status(400).json({message: "all orders failed to fetched", status: false});
        }
        res.status(200).json({message: "order fetched successfully", orders, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER ORDERS
const getOrderById = async (req, res) => {
    try {
        const orderById = await Order.find({ userId: req.params.userId });
        if(!orderById) {
           return res.status(400).json({message: "order failed to fetched", status: false});
        }
        res.status(200).json({message: "order fetched successfully", orderById, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


//CREATE ORDER
const createOrder = async (req, res) =>{
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        if(!savedOrder){
           return res.status(400).json({message: "order failed to added", status: false});
        }
        res.status(200).json({message: "order added successfully" ,savedOrder, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE ORDER
const updateOrderById = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        if(!updatedOrder) {
           return res.status(400).json({message: "order failed to updated", status: false});
        }
        res.status(200).json({message: "order udpated successfully" , updatedOrder, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


//DELETE ORDER
const deleteOrderById = async (req, res) =>{
    try {
        const orderDeleted = await Order.findByIdAndDelete(req.params.id);
        if(!orderDeleted){
           return res.status(400).json({message: "order failed to deleted", status: false});
        }
        res.status(200).json({message: "Order has been deleted...", orderDeleted, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


// GET MONTHLY INCOME
const getMonthlyIncome = async (req, res) =>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                month: { $month: "$createdAt" },
                sales: "$amount",
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: "$sales" },
                },
            },
        ]);
        if(!income){
           return res.status(400).json({message: "income failed to fetched", status: false});
        }
        res.status(200).json({message: "income fetched successfully", income, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    getAllOrder,
    getOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
    getMonthlyIncome
};