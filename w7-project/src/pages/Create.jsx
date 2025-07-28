import { useState } from "react";
import { supabase } from "../clients";

const Create = () => 
{
    const [name,setName] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("red");

    const create = async (event) =>{
        event.preventDefault();
        const { error } = await supabase.from('crewmate').insert([{ name, description, color }]).select();

        if(error){
            console.error("Failed to create:", error.message);
            return;
        }
        else{
            alert("Crewmate successfully created");
            window.location = "/gallery";

        }
    }
    return(
        <div>
           <h2>Create Crewmate</h2>
            <div className="create">
            <form onSubmit={create}>
                <input placeholder="Name" value = {name} onChange={e => setName(e.target.value)} required/>
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
                <select value={color} onChange={e => setColor(e.target.value)}>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                </select>
                <button type="submit">Add</button>
            </form>
            {color === "red" && (
                <img className = "red-au"src="src/assets/among-us-red.png" alt="Red Crewmate" />
            )}
            {color === "green" && (
                <img src="src/assets/among-us-green.png" alt="Green Crewmate" />
            )}
            {color === "blue" && (
                <img src="src/assets/among-us-blue.png" alt="Blue Crewmate" />
            )}
            </div>
        </div>
    );
}
export default Create
