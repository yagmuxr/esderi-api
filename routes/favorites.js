// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");
// const Product = require("../models/Product");

// // Favorilere ürün ekleme
// router.post("/add", async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     if (!user.favorites.includes(productId)) {
//       user.favorites.push(productId);
//       await user.save();
//       res.status(200).json({ message: "Product added to favorites" });
//     } else {
//       res.status(400).json({ message: "Product already in favorites" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Favorilerden ürün çıkarma
// router.post("/remove", async (req, res) => {
//   const { userId, productId } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     user.favorites = user.favorites.filter((id) => id.toString() !== productId);
//     await user.save();
//     res.status(200).json({ message: "Product removed from favorites" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Favori ürünleri listeleme
// router.get("/:userId", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId).populate("favorites");
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.status(200).json(user.favorites);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
