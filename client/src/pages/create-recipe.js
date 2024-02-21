import { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";

export const CreateRecipe = () => {
  const userID = useGetUserID();

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

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (event, req, res) => {
    event.preventDefault();
    try {
      // Send post request and get response
      const response = await axios.post(
        "http://localhost:3001/recipes",
        recipe
      );
      console.log(recipe);
      res.json(response);
      console.log(response);
    } catch (err) {
      res.json(err);
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
