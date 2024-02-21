import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID.js";

export const CreateRecipe = () => {
  // Get user ID
  const userID = useGetUserID();

  // Navigate hook
  const navigate = useNavigate();

  // Recipe object
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgURL: "",
    cookingTime: 0,
    userOwner: userID,
  });

  // Handle input/textarea change
  const handleChange = (event) => {
    // Get name and value from event
    const { name, value } = event.target;
    // Change input value inside of recipe to new value
    setRecipe({ ...recipe, [name]: value });
  };

  // Handle specific ingredient in array change
  const handleIngredientChange = (event, idx) => {
    // Get value inside text input field
    const { value } = event.target;
    // Get a copy of current ingredients array
    const ingredients = recipe.ingredients;
    // Change the value of the ingredient at index
    ingredients[idx] = value;
    // Replace the ingredients array inside recipe object with new array
    setRecipe({ ...recipe, ingredients });
  };

  // Add blank in ingredient array inside of recipe object
  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  // On create recipe form submit
  const onSubmit = async (event) => {
    // Prevent post refresh
    event.preventDefault();
    try {
      // Send post request to add recipe
      await axios.post("http://localhost:3001/recipes", recipe);
      // Navigate to home page
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <button onClick={addIngredient} type="button">
          Add Ingredient
        </button>
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>
        <label htmlFor="imgURL">Image URL</label>
        <input type="text" id="imgURL" name="imgURL" onChange={handleChange} />
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};
