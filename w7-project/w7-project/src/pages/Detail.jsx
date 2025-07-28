import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../clients";

const Detail = () =>{
    const{id} = useParams();
    const[crewmate, setCrewmate] = useState(null);
    useEffect(()=>{
        const fetchCrewmate = async() =>{
            const {data} = await supabase.from("crewmate").select().eq("id", id);
            setCrewmate(data[0]);
        }
        fetchCrewmate();
    },[id]);

    if (!crewmate) return <p>Loading...</p>;


    return(
        <div>
            <h2>{crewmate.name}</h2>
            <p><strong>Description:</strong> {crewmate.description}</p>
            <p><strong>Color: </strong>{crewmate.color}</p>
            <p><strong>Created At: </strong>{new Date(crewmate.created_at).toLocaleString()}</p>
            <div>
                {crewmate.color === "red" && (
                    <img className='red-aus' src='/src/assets/among-us-red.png'alt="Red Crewmate" />
                )}
                {crewmate.color === "green" && (
                    <img src='/src/assets/among-us-green.png' alt="Green Crewmate" />
                )}
                {crewmate.color === "blue" && (
                    <img src='/src/assets/among-us-blue.png' alt="Blue Crewmate" />
                )}
            </div>
            <Link className = 'edit' to={`/edit/${id}`}>Edit</Link>
        </div>
    )
    
}
export default Detail