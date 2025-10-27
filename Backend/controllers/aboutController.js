const aboutModel = require("../models/About")

const aboutController = {}

aboutController.aboutSection = async (req, res) => {
    try {
        const { description, instagram, facebook, whatsapp } = req.body
        await aboutModel.create({ description, instagram, facebook, whatsapp });
        return res.status(200).json({ message: "Content Added" });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

aboutController.getAboutContent = async (req, res) => {
    try {
        const content = await aboutModel.find()
        res.json(content)
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error fetching content" });
    }
}

aboutController.updateAboutContent = async (req, res) => {
    try {
        const { id } = req.params; // Get id from URL params
        const { description, instagram, facebook, whatsapp } = req.body;

        // Find and update the existing record
        const updatedContent = await aboutModel.findByIdAndUpdate(
            id,
            { description, instagram, facebook, whatsapp },
            { new: true } // returns the updated document
        );

        if (!updatedContent) {
            return res.status(404).json({ message: "Content not found" });
        }

        return res.status(200).json({
            message: "Content updated successfully",
            updatedContent,
        });
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server Error" });
    }
};


module.exports = aboutController;
