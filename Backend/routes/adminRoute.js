const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const verifyAdmin = require("../middlewares/authMiddleware");

router.post("/create", authController.createAccount);
router.post("/login", authController.login);
router.put("/update/:_id", authController.update);
router.get("/verify", verifyAdmin, (req, res) => {
  res.status(200).json({ admin: req.admin });
});

module.exports = router;
