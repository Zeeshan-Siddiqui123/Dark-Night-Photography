const Portfolio = require("../models/Portfolio");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const portfolioController = {}

portfolioController.createPortfolio = async (req, res) => {
  try {
    const { title, description } = req.body;
    const files = req.files;

    if (!files || files.length < 3 || files.length > 9) {
      return res
        .status(400)
        .json({ message: "You must upload between 3 and 9 images." });
    }

    // Upload to Cloudinary
    const uploadedImages = [];
    for (const file of files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "portfolio",
      });
      uploadedImages.push(result.secure_url);
      fs.unlinkSync(file.path); // delete local temp file
    }

    const newPortfolio = await Portfolio.create({
      title,
      description,
      images: uploadedImages,
    });

    res.status(201).json({ success: true, data: newPortfolio });
  } catch (error) {
    res.status(500).json({ message: "Error creating portfolio", error });
  }
};

// Get All
portfolioController.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: portfolios });
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolios", error });
  }
};

// Get One
portfolioController.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });
    res.status(200).json({ success: true, data: portfolio });
  } catch (error) {
    res.status(500).json({ message: "Error fetching portfolio", error });
  }
};



// Delete
portfolioController.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    if (!portfolio)
      return res.status(404).json({ message: "Portfolio not found" });

    // Delete images from Cloudinary
    for (const url of portfolio.images) {
      const publicId = url.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`portfolio/${publicId}`);
    }

    await portfolio.deleteOne();
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting portfolio", error });
  }
};
 
module.exports = portfolioController