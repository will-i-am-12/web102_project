import React from "react";
import { Link } from 'react-router-dom';

const RecipeItem = ({recipe}) =>{
    const calories = recipe.nutrition.nutrients.find(
        (n) =>n.name == "Calories").amount
        
    
    return(
        <li className="recipe-item">
            <Link to={`/recipe/${recipe.id}`}>
                <div>
                    <strong>{recipe.title}</strong>({recipe.cuisines?.join(", ") || "N/A"})
                </div>
                <div>
                    Calories: {calories ? calories : "N/A"} | Ready in: {" "}
                    {recipe.readyInMinutes || "N/A"}
                </div>
            </Link>
        </li>
    )
}
export default RecipeItem;