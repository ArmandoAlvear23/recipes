import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  // Get username and password from client
  const { username, password } = req.body;

  // Check to see if username already exists
  const user = await UserModel.findOne({ username });

  // User already exists
  if (user) {
    return res.json({ message: "User already exists!" });
  }

  // Hash password passed in from client
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user based on client sent data
  const newUser = new UserModel({ username, password: hashedPassword });

  // Save user to database
  await newUser.save();

  // Return user
  res.json({ newUser, message: "User registered successfully!" });
});

// Login user
router.post("/login", async (req, res) => {
  // Get username and password from client
  const { username, password } = req.body;

  // Check to see if user exists in database
  const user = await UserModel.findOne({ username });

  // User does not exist
  if (!user) {
    return res.json({ message: "User not found." });
  }

  // Check if password is valid
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Password is incorrect
  if (!isPasswordValid) {
    return res.json({ message: "Username or password is incorrect." });
  }

  // Create JSON web token using user id and secret
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Return JSON web token and user id
  res.json({ token, userID: user._id });
});

// Export user router
export { router as userRouter };

// Verify JSON web token middleware
export const verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.headers.authorization;

  // If token is present
  if (token) {
    // Verify JSON web token
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      // Token is not verified
      if (err) return res.sendStatus(403);
      // Token is verfied, proceed
      next();
    });
  } else {
    // Token not found in header
    res.sendStatus(401);
  }
};
