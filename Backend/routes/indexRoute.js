const express = require("express");
const router = express.Router();
const adminRoute = require("./adminRoute");

router.use("/api/admin", adminRoute);

module.exports = router;
