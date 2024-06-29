const Product = require("../models/Product");


//GET ALL PRODUCTS
const getAllProduct = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
          products = await Product.find().sort({ createdAt: -1 }).limit(1);
        } else if (qCategory) {
            products = await Product.find({
                categories: {
                $in: [qCategory],
                },
            });
        } else {
            products = await Product.find();
        }

        res.status(200).json({message: "product fetched successfully", products, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//GET PRODUCT BY ID
const getProductById = async (req, res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
           return res.status(400).json({message: "product fetched to product", status: false});
        } 
        res.status(200).json({message: "product fetched successfully", product, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//CREATE PRODUCT
const createProduct = async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        if(!savedProduct){
           return res.status(400).json({message: "product failed to saved", status: false});
        }
        res.status(200).json({message: "product saved successfully", savedProduct, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}


//UPDATE PRODUCT
const updatedProductProductById = async (req, res) =>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        if(!updatedProduct){
           return res.status(400).json({message: "product failed to update", status: false});
        }
        res.status(200).json({message: "product udpated successfully", updatedProduct, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE PRODUCT
const deleteProductById = async (req, res) =>{
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if(!deleteProduct){
           return res.status(400).json({message: "product failed to deleted", status: false});
        }
        res.status(200).json({message:"Product has been deleted...", deleteProduct, status: true});
    } catch (err) {
        res.status(500).json(err);
    }
}



module.exports = {
    getAllProduct,
    getProductById,
    createProduct,
    updatedProductProductById,
    deleteProductById
};