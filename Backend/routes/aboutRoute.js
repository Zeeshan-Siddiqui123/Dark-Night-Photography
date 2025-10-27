const express = require("express");
const aboutController = require("../controllers/aboutController");
const router = express.Router();

router.post("/aboutcontent", aboutController.aboutSection)
router.get("/aboutcontent", aboutController.getAboutContent)
router.put("/updateaboutcontent/:id", aboutController.updateAboutContent)

module.exports = router;