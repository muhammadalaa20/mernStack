import Product from "../models/Product.model.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
        try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const postProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.description || !product.image) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newProduct = new Product(product);
    try {
        newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    if( !mongoose.Types.ObjectId.isValid(id) ) {
        res.status(404).json({ message: 'Invalid ID' });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: 'Product not found' });
        
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Invalid ID' });
    }
    try {
        await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}