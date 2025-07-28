import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../clients";

const Edit =()=>
{
    const {id} = useParams();
    const [name,setName] = useState("");
    const [description,setDescription] = useState("");
    const [color,setColor] = useState("red");

    useEffect(()=>{
        const fetchCrewmate = async() => {
            const {data} = await supabase.from("crewmate").select().eq("id", id);
            setName(data.name);
            setDescription(data.description);
            setColor(data.color)
        }
        fetchCrewmate();
    },[id]);

    const update = async(event) =>{
        event.preventDefault();
        await supabase.from('crewmate').update({ name, description, color }).eq("id", id);
        window.location = '/gallery';
    }
    const deletes = async(event) =>{
        event.preventDefault();
        await supabase.from("crewmate").delete().eq("id", id);
        window.location = "/gallery";
    }
    return(
        <form onSubmit={update}>
            <h2>Edit Crewmate</h2>
            <input value={name} onChange={e =>setName(e.target.value)} required/>
            <textarea value={description} onChange={e => setDescription(e.target.value)} />
            <select value={color} onChange={e => setColor(e.target.value)}>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
            </select>
            <button type="submit">Update</button>
            <button type="button" onClick={deletes}>Delete</button>
        </form>
    )

}
export default Edit
