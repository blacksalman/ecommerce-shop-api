const Cart = require("../models/Cart");

//GET ALL
const getAllCartItem = async (req, res) =>{
    try {
        const carts = await Cart.find();
        if(!carts){
           return res.status(400).json({message: "cart items not found"});
        }
        res.status(200).json({message: "cart item found successfully", carts, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET USER CART
const getCartItem = async (req, res) =>{
    try {
        const cartItem = await Cart.findOne({ userId: req.params.userId });
        if(!cartItem){
           return res.status(400).json({message: "cart item Id not found", status: false});
        }
        res.status(200).json({message: "cart item get successfully", cartItem, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


//CREATE
const createCart = async (req, res) => {

    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        if(!savedCart){
           return res.status(400).json({message: "cart not saved", status: false});
        }
        res.status(200).json({message: "cart saved successfully", savedCart, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//UPDATE
const updateCartById = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        if(!updatedCart){
           return res.status(400).json({message: "cart not updated", status: false});
        }
        res.status(200).json({message: "cart udpate successfully" ,updatedCart, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE
const deleteCartById = async (req, res) => {
    try {
        const deleteItem = await Cart.findByIdAndDelete(req.params.id);
        if(!deleteItem){
           return res.status(400).json({message: "Item ID not found", status: false});
        }
        res.status(200).json({message: "Cart has been deleted...", deleteItem, status: true});
      } catch (err) {
        res.status(500).json(err);
    }
}


module.exports = {
    getAllCartItem,
    getCartItem,
    createCart,
    updateCartById,
    deleteCartById
};