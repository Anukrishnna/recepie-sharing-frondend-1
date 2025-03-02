import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const App = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await axios.get('http://localhost:5000/recipes');
      setRecipes(res.data);
    };

    fetchRecipes();
    socket.on('recipeUpdated', (updatedRecipe) => {
      setRecipes((prev) => prev.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
    });

    return () => socket.off('recipeUpdated');
  }, []);

  return (
    <div>
      <h1>Recipe Sharing Platform</h1>
      {recipes.map(recipe => (
        <div key={recipe._id}>
          <h2>{recipe.title}</h2>
          <p>{recipe.author}</p>
        </div>
      ))}
    </div>
  );
};

export default App;