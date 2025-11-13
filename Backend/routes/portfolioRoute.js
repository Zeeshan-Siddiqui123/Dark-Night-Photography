const express = require("express");
const router = express.Router();
const multer = require("multer");
const portfolioController = require("../controllers/portfolioController");

const upload = multer({ dest: "uploads/" });

router.post("/create", upload.array("images", 9), portfolioController.createPortfolio);
router.get("/captures", portfolioController.getPortfolios);
router.get("/captures/:id", portfolioController.getPortfolioById);
router.delete("/:id", portfolioController.deletePortfolio);


module.exports = router;
