const express = require("express");
const router = express.Router();

const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  const { email, order_data } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    let data = order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    let eId = await Order.findOne({ email: email });

    if (eId === null) {
      await Order.create({
        email: email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      await Order.findOneAndUpdate(
        { email: email },
        {
          $push: {
            order_data: data,
          },
        }
      ).then(() => {
        res.json({ success: true });
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
