import React from "react";

const RecipeItem = ({recipe}) =>{
    const calories = recipe.nutrition.nutrients.find(
        (n) =>n.name == "Calories").amount
        
    
    return(
        <li className="recipe-item">
            <div>
                <strong>{recipe.title}</strong>({recipe.cuisines?.join(", ") || "N/A"})
            </div>
            <div>
                Calories: {calories ? calories : "N/A"} | Ready in: {" "}
                {recipe.readyInMinutes || "N/A"}
            </div>
        </li>
    )
}
export default RecipeItem;