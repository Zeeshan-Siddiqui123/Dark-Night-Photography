const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db")();
const path = require('path');
const cookieParser = require("cookie-parser");
const indexRoute = require('./routes/indexRoute.js')

const app = express();
app.use(cookieParser())
app.use(cors({
  origin:
   [process.env.FRONTEND_URL, process.env.LOCALHOST_URL]
   ,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/", (req, res)=>{
//   res.send("Hello World")
// })

app.use("/", indexRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});