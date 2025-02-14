const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({ username, email, password });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    if (!userData || !(await userData.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: userData._id }, ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(
      { userId: userData._id },
      REFRESH_TOKEN, 
      { expiresIn: "7d" }
    );

    const user = {
      username: userData.username,
      email: userData.email,
      _id: userData._id,
    };

    res.json({ accessToken, refreshToken, user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// Get User Info Route
router.get("/me", verifyToken, async (req, res) => {
  
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired" });
    }
    res.status(500).json({ message: "Error fetching user data" });
  }
});

// Refresh Token Route
router.post("/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh Token is required" });
    }


    jwt.verify(refreshToken, REFRESH_TOKEN, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid refresh token" });
      }


      const newAccessToken = jwt.sign(
        { userId: user.userId },
        ACCESS_TOKEN, 
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { userId: user.userId },
        REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

    
      res.json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Error refreshing token" });
  }
});

module.exports = router;
