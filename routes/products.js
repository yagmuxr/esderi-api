const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
        console.log('GET /api/products - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('GET /api/products - 500 Server error');
    }
});

// Get product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log('GET /api/products/:id - 404 Product not found');
            return res.status(404).json({ error: "Product not found." });
        }
        res.status(200).json(product);
        console.log('GET /api/products/:id - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('GET /api/products/:id - 500 Server error');
    }
});

// Create a new product
router.post("/", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
        console.log('POST /api/products - 201 Created');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('POST /api/products - 500 Server error');
    }
});

// Update product by ID
router.put("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const updates = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        if (!updatedProduct) {
            console.log('PUT /api/products/:id - 404 Product not found');
            return res.status(404).send("Product not found");
        }

        res.status(200).json(updatedProduct);
        console.log('PUT /api/products/:id - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
        console.log('PUT /api/products/:id - 500 Server error');
    }
});

// Delete product by ID
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            console.log('DELETE /api/products/:id - 404 Product not found');
            return res.status(404).send("Product not found");
        }

        res.status(200).json({ message: "Product deleted successfully" });
        console.log('DELETE /api/products/:id - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
        console.log('DELETE /api/products/:id - 500 Server error');
    }
});

// Search products by name
router.get("/search/:name", async (req, res) => {
    try {
        const name = req.params.name;
        const products = await Product.find({ name: { $regex: name, $options: 'i' } });
        if (!products.length) {
            console.log('GET /api/products/search/:name - 404 No products found');
            return res.status(404).json({ error: "No products found." });
        }
        res.status(200).json(products);
        console.log('GET /api/products/search/:name - 200 OK');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
        console.log('GET /api/products/search/:name - 500 Server error');
    }
});
// Get products by category
router.get("/category/:category", async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});


module.exports = router;
