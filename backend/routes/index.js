// index.js             # Tập hợp các routes
const express = require("express");
const authRoute = require("./authRoute");
const bookRoute = require("./bookRoute");
const userRoute = require("./userRoute");
const transactionRoute = require("./transactionRoute");

const router = express.Router();

// Sử dụng các routes
router.use("/auth", authRoute);
router.use("/books", bookRoute);
router.use("/users", userRoute);
router.use("/transactions", transactionRoute);

module.exports = router;
