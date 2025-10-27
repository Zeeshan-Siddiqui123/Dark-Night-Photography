const authModel = require("../models/Auth")
const bcrypt = require("bcrypt");
const { AdmintokenGenerator } = require("../utils/token");

const authController = {};

authController.createAccount = async(req, res) => {
    try {
        const { username, password } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        await authModel.create({ username, password: hash});

        return res.status(200).json({ message: "Account created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Server Error" });
    }
}

authController.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await authModel.findOne({ username });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!admin || !isMatch) {
      return res.status(400).json({ message: 'Invalid Username or Password' });
    }
    const token = AdmintokenGenerator(admin)
    res.cookie("token", token, {
      httpOnly: true,      
      secure: false,    
      sameSite: "lax",     
      maxAge: 1 * 60 * 60 * 1000, 
    })

    res.status(200).json({
      message: "Login successful",
      admin: { id: admin._id, username: admin.username },
    })
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}

authController.update = async(req, res) => {
    try {
    const { _id } = req.params;
    const { username, password} = req.body;
    await authModel.findByIdAndUpdate(_id, { username, password });
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({ message: 'Server Error' });
  }
}


module.exports = authController;