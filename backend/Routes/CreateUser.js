const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "Mynameisbhadrayupanwarimadevoloper";
router.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      if (!userData) {
        console.log("User not found");
        return res.status(400).json({ errors: "User not found" });
      }

      console.log("User Data:", userData); // Debug log to check the userData object

      console.log("Entered Password:", req.body.password);
      console.log("Stored Password:", userData.password);
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );
      if (req.body.password !== userData.password) {
        console.log("Incorrect password");
        return res.status(400).json({ errors: "Incorrect password" });
      }
      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log("Database error:", error); // Debug log to check for database-related errors
      res.status(500).json({ success: false });
    }
  }
);

module.exports = router;
