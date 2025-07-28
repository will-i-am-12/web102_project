import { useEffect, useState } from "react";
import { supabase } from "../clients";
import { Link } from "react-router-dom";

const Gallery =()=>
{
    const [crewmates, setCrewmates] = useState([]);
    useEffect(()=>{
        const fetchCrewmates = async () =>
        {
            const {data} = await supabase.from("crewmate").select().order("created_at", { ascending: false });
            setCrewmates(data);
        }
        fetchCrewmates();
    },[])
    return(
        <div>
            <h2>Crewmate Gallery</h2>
            <ul>
                {crewmates.length==0 &&(
                    <p>You haven't made a crewmate yet, go create one!</p>
                )}
                {crewmates.map(c =>(
                    <li key ={c.id}>
                        <Link className = 'edit' to={`/crewmate/${c.id}`}>{c.name} ({c.color})</Link>
                        <Link className='edit'to={`/edit/${c.id}`}>✏️</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Gallery