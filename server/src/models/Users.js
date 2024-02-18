import mongoose from "mongoose";

// Create schema for user
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create model for user
export const UserModel = mongoose.model("users", UserSchema);
