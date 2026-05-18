const recordRoutes = require("./routes/recordRoutes");
const authRoutes = require("./routes/authRoutes");
const User = require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Backend is working");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/medicolegal")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
