import mongoose from "mongoose";

// Create schema for user
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "recipes" }],
});

// Create model for user
export const UserModel = mongoose.model("users", UserSchema);
