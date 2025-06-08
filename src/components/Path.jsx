import React from "react";

const Path = (props) => {
    return(
        <div className={"card "}>
            <img className="img" src={props.img}/>
            <h4>{props.path}</h4>
            <button>Learn More</button>
        </div>
    )
}
export default Path;