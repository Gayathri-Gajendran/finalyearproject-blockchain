const express = require("express");
const User = require("../models/User");

const router = express.Router();


// ============================
// ✅ REGISTER USER
// ============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      role,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    console.log("LOGIN HIT");
    console.log("Request body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    console.log("User from DB:", user);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

   if (user.status === "Blocked") {
  return res.status(403).json({
    message: "Your account has been blocked by admin"
  });
}

if (user.password !== password) {
  return res.status(400).json({ message: "Invalid password" });
}

    res.json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    console.log("FULL ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
});
// BLOCK USER
router.put("/users/block/:id", async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: "Blocked" },
      { new: true }
    );

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;