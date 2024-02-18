import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "./loadEnv.js";

// Import routers
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";

const app = express();

// Convert all data received from frontend into JSON
app.use(express.json());

// Allows the front-end client to make requests to the back-end server
app.use(cors());

// Route endpoints to routers
app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

// Connect to mongodb database
mongoose.connect(process.env.MONGODB_STRING);

// Get server port from .env file
const serverPort = process.env.SERVER_PORT;

// Initiate server to listent to port 3001
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}...`);
});
