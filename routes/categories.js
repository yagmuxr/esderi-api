const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

//create a new category
router.post("/", async (req, res) => {
    try {
        const { name, img } = req.body;
        const newCategory = new Category({ name, img });
        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

//get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error." });
    }
});

// Get category by ID
router.get("/:id", async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send("Category not found");
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Server error." });
    }
});

// Update category by ID
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
           updates,
           {new:true}
        );
 
        if (!updatedCategory) {
            return res.status(404).send("Category not found");
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});
// Delete category by id
router.delete("/:id", async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).send("Category not found");
        }

        res.status(200).send("Category deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});


module.exports = router;
