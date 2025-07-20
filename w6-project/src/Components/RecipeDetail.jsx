import {useParams} from "react-router-dom";
import {useEffect,useState} from 'react';

const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

const RecipeDetail =() =>{
    const {id} = useParams();
    const[recipe,setRecipe] = useState(null);

    useEffect(()=>{
        async function fetchRecipe(){
            const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`);
            const data = await res.json();
            setRecipe(data);
        }
        fetchRecipe();
    },[id])
    if(!recipe){
        return(
            <p>Loading...</p>
        )
    }
    return(
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.image} alt={recipe.title}/>
            <p>Cuisine: {recipe.cuisines?.join(", ") || "N/A"}</p>
            <p>Ready in: {recipe.readyInMinutes} minutes</p>
            <p>Price per serving: ${recipe.pricePerServing}</p>
            <p>Calories: {
                recipe.nutrition?.nutrients?.find(n => n.name === "Calories")?.amount || "N/A"
            }</p>
        </div>
    )

}
export default RecipeDetail