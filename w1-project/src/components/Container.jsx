import React from "react";
import Path from "./Path"

const Container = () => {
    return(
    <div className="container">
      <Path path= "Software Development" img = "src/assets/software.webp"/>
      <Path path= "Artificial Intelligence" img = "src/assets/ai.jpg"/>
      <Path path = "Cloud Development" img ="src/assets/cloud.jpg"/>
      <Path path = "Cybersecurity" img = "src/assets/cybersecurity.webp" />
      <Path path = "Data Science" img = "src/assets/data-science.jpg"/>
      <Path path = "Game Development" img = "src/assets/game.webp" />
      <Path path = "IoT Developer" img = "src/assets/IoTDeveloper.jpg"/>
      <Path path = "Network Engineer" img = "src/assets/networkengineer.jpg" />
      <Path path = "System Adminstrator" img = "src/assets/systemadministrator.jpg"/>
      <Path path = "Web Development" img = "src/assets/web.jpg"/>
    </div>
    )
}
export default Container;