const express = require("express");
const router = express.Router();
const adminRoute = require("./adminRoute");
const aboutRoute = require("./aboutRoute");

router.use("/api/admin", adminRoute);
router.use("/api/about", aboutRoute);

module.exports = router;
