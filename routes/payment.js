const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.SRTIPE_SECRET_KEY);

router.post("/", async (req, res) => {
  const { products, user, cargoFee } = req.body;

  console.log("Request Body:", req.body);

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        description: product.description, // Ürün açıklamasını ekleyin
        images: product.img, // Ürün resimlerini ekleyin
      },
      unit_amount: Math.round(product.price * 100), // price should be in cents
    },
    quantity: product.quantity,
  }));

  if (cargoFee !== 0) {
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Shipping",
        },
        unit_amount: cargoFee * 100,
      },
      quantity: 1,
    });
  }

  console.log("Line Items:", lineItems);

  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/cancel`,
    });

    console.log("Stripe Session:", session);

    res.status(200).json({ id: session.id });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Server error: " + error.message });
  }
});

module.exports = router;
