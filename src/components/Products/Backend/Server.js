require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to access backend

// 🛒 API Route for Stripe Payment
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;

    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price * 100, // Convert price to cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success", // Redirect after successful payment
      cancel_url: "http://localhost:3000/cancel", // Redirect if payment is canceled
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Start Backend Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
