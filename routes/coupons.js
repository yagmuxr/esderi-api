const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');

// Create a new coupon
router.post("/", async (req, res) => {
    try {
        const { code } = req.body;
        // Kupon kodunun zaten var olup olmadığını kontrol et
        const existingCoupon = await Coupon.findOne({ code });
        if (existingCoupon) {
            return res.status(400).json({ error: "Coupon code already exists." });
        }
        const newCoupon = new Coupon(req.body);
        await newCoupon.save();
        res.status(201).json(newCoupon);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

// Get all coupons
router.get("/", async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Get coupon by ID
router.get("/:id", async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found." });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

// Update coupon by ID
router.put("/:id", async (req, res) => {
    try {
        const couponId = req.params.id;
        const updates = req.body;
        const updatedCoupon = await Coupon.findByIdAndUpdate(couponId, updates, { new: true });

        if (!updatedCoupon) {
            return res.status(404).send("Coupon not found");
        }

        res.status(200).json(updatedCoupon);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

// Delete coupon by ID
router.delete("/:id", async (req, res) => {
    try {
        const couponId = req.params.id;
        const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

        if (!deletedCoupon) {
            return res.status(404).send("Coupon not found");
        }

        res.status(200).json({ message: "Coupon deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred");
    }
});

// Get coupon by code
router.get("/code/:code", async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ code: req.params.code });
        if (!coupon) {
            return res.status(404).json({ error: "Coupon not found." });
        }
        res.status(200).json(coupon);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
