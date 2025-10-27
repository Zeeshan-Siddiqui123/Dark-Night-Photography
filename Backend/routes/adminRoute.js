const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.createAccount)
router.post("/login", authController.login)
router.put("/update/:_id", authController.update)

module.exports = router;