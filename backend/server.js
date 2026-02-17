// Importing required modules
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/config.js"; // Assuming config is a local module
import colors from 'colors';

// Routes
import blogeRoutes from "./routers/blog.route.js";
import authRoutes from "./routers/auth.routes.js";


dotenv.config();

// Database connection
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/bloges", blogeRoutes);
app.use("/api/auth", authRoutes);
// Port
const PORT = process.env.PORT || 5000;

// Server listener
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`.bgCyan.white);
});