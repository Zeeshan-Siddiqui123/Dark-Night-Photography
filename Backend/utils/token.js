const jwt = require("jsonwebtoken");

const AdmintokenGenerator = (admin) => {
  return jwt.sign(
    { id: admin._id, username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

module.exports = { AdmintokenGenerator };
