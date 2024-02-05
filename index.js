require("dotenv").config();
const express = require('express');
const cors = require('cors')
const cloudinary = require('cloudinary').v2;
const { connectDB } = require("./src/config/db");
const UserRoutes = require("./src/api/routes/user.routes");
const GameRoutes = require("./src/api/routes/games.routes");
const ConsolaRoutes = require("./src/api/routes/consolas.routes");
const { configCloudinary } = require("./src/middlewares/ficherosfiles.middleware");

const app = express();
app.use(cors());

connectDB();
configCloudinary()  // Esta funcion está definida en el middleware

app.use(express.json())

app.use("/api/users", UserRoutes);
app.use("/api/games", GameRoutes);
app.use("/api/consolas", ConsolaRoutes);

app.use("*", (req,res,next) => {return res.status(404).json("Route Not Found")})
app.listen(3000, ()=>{console.log("http://localhost:3000")});