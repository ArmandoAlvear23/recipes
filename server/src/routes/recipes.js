import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";

const router = express.Router();

// Get list of all recipes
router.get("/", async (req, res) => {
  try {
    // Get all recipes from database
    const response = await RecipeModel.find({});
    // Return all recipes data via response
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

// Create a new recipe
router.post("/", async (req, res) => {
  // Create new recipe from request
  const newRecipe = new RecipeModel(req.body);

  try {
    // Save new recipe to database
    await newRecipe.save();
    res.json(recipe);
  } catch (err) {
    res.json(err);
  }
});

// Save recipe to user profile
router.put("/", async (req, res) => {
  try {
    // Get recipe from database using recipe ID
    const recipe = await RecipeModel.findById(req.body.recipeID);
    // Get user from database using user ID
    const user = await UserModel.findById(req.body.userID);
    // Add recipe to user
    user.savedRecipes.push(recipe);
    // Save new recipe to user in database
    await user.save();
    // Return all saved recipes from user
    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

export { router as recipesRouter };
