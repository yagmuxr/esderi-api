const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema(
    {
      text: { type: String, required: true },
      rating: { type: Number, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
  );

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        img: [{ type: String, required: true }],
        reviews: [ReviewSchema],
        description: { type: String, required: true },
        colors: [{ type: String, required: true }],
        price: {
            current: { type: Number, required: true },
            discount: { type: Number }
        },
        category: {
            type: String,
            ref: "Category",
            required: true
        },
        textOverlay: { type: String }
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
