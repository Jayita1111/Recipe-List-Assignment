import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=110&skip=0")
      .then((res) => res.json())
      .then((data) => setRecipes(data.recipes))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div className="app">
      <header>
        <div className="header">
          <h1>50 Delicious Recipes to Try</h1>
          <p> click on a recipe for ingredients and instructions</p>
        </div>
      </header>

      <div className="recipe-container">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="recipe-card"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} className="recipe-img" />
            <h2>{recipe.name}</h2>
            <p><b>Cuisine:</b> {recipe.cuisine}</p>
            <p><b>Difficulty:</b> {recipe.difficulty}</p>
            <p><b>Servings:</b> {recipe.servings}</p>
            <p><b>Calories:</b> {recipe.caloriesPerServing}</p>
            <p><b>Prep time (mins):</b> {recipe.prepTimeMinutes} </p>
            <p><b>Cooking time (mins):</b> {recipe.cookTimeMinutes}</p>
            <p><b>Rating:</b> {recipe.rating} ({recipe.reviewCount} reviews)</p>
            <div className="tags">
              {recipe.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

  
      {selectedRecipe && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedRecipe(null)}>close</button>
            
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>

            <h3>Instructions</h3>
            <ol>
              {selectedRecipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <footer>
        <div className="footer">
          <p>Jayita Yadav | 2024IMT-031 | C2</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
