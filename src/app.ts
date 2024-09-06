import express from "express";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from 'morgan';
import Stripe from "stripe";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import orderRoute from "./routes/order.js";
import paymentRoute from './routes/payment.js'
import dashboardRoute from './routes/stats.js';

// Importing Database Connection Utility
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";


// Load environment variables from .env file
config({
  path: "./.env",
});

// Set up port and MongoDB URI from environment variables
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

// Connect to MongoDB
connectDB(mongoURI);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


export const stripe = new Stripe(stripeKey);

// Initialize caching mechanism using NodeCache
export const myCache = new NodeCache();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


// check endpoint
app.get("/", (req, res) => {
  res.send("API is working with /api/v1");
});

// Use imported routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use(errorMiddleware);

// Start the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
