const express = require("express");
const router = express.Router();
const adminRoute = require("./adminRoute");
const aboutRoute = require("./aboutRoute");
const portfolioRoute = require("./portfolioRoute")

router.use("/api/auth", adminRoute);
router.use("/api/about", aboutRoute);
router.use("/api/portfolio", portfolioRoute)

module.exports = router;
