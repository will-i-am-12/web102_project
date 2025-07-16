import React, { useState, useEffect } from 'react'
import RecipeItem from './Components/RecipeItem';
import './App.css'

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [recipes, setRecipes] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("");


  useEffect(()=>
  {
    async function fetchRecipes(){
      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?number=50&addRecipeNutrition=true&apiKey=${API_KEY}`
      )
      const data = await response.json();
      setRecipes(data.results)
    }
    fetchRecipes();
  },[])
  const allCuisines = Array.from(
    new Set(
      recipes.flatMap(r => r.cuisines || [])
    )
  );

  const filteredRecipes = recipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(searchInput.toLowerCase())&&
    (selectedCuisine === "" || recipe.cuisines?.includes(selectedCuisine)))

  const totalRecipes = filteredRecipes.length

  const caloriesList = filteredRecipes.map((r)=> r.nutrition.nutrients.find((n) => n.name == "Calories").amount)

  const averageCalories = caloriesList.length > 0?
  (
    caloriesList.reduce((sum,c) => sum+c,0)/caloriesList.length
  ):"N/A";

  const maxReadyTime = filteredRecipes.length>0?
  Math.max(...filteredRecipes.map((r)=>r.readyInMinutes || 0))
  :"N/A";

  return (
      <div>
        <h1>Recipe Dashboard</h1>
        <div className='controls'>
          <input 
            type='text' 
            placeholder='Search recipes...' 
            value={searchInput} 
            onChange={(e)=>setSearchInput(e.target.value)}
          />
          <select value={selectedCuisine} onChange={(e) => setSelectedCuisine(e.target.value)}>
          <option value="">All</option>
          {allCuisines.map(cuisine => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
        </div>
        <div className='summary'>
          Total recipes: {totalRecipes} | Average Calories: {averageCalories} | Max Ready Time: {maxReadyTime} min
        </div>
        <ul className='recipe-list'>
          {filteredRecipes.length==0 && <li>No recipes found.</li>}
          {filteredRecipes.map((recipe)=>(
            <RecipeItem recipe={recipe}/>
          ))}
        </ul>
      </div>
  )
}

export default App
