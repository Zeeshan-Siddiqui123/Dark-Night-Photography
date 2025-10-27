const jwt = require("jsonwebtoken")

const AdmintokenGenerator = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      username: admin.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7h" }
  )
}

module.exports = { AdmintokenGenerator }
