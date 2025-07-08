import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
function App() {
  const [currentImage,setCurrentImage] = useState(null);
  const [banned, setBanned] = useState({
    weight: [],
    origin: [],
    age: [],
  });
  const submit = () =>{
    let query = `https://api.thedogapi.com/v1/images/search?api_key=${ACCESS_KEY}`;
    callAPI(query).catch(console.error);
  }

    const callAPI = async (query) => {
      const response = await fetch(query);
      const json = await response.json();
      const dog = json[0];
      const breed = dog.breeds[0];

      if (!dog || !dog.url || !breed) {
        callAPI(query);
        return;
      }

      
      const weight = breed.weight.metric || "Unknown";
      const origin = breed.origin || "Unknown";
      const age = breed.life_span || "Unknown";
      if (
        banned.weight.includes(weight) ||
        banned.origin.includes(origin) ||
        banned.age.includes(age)
      ) {
        callAPI(query);
        return;
      }
      setCurrentImage({
        url: dog.url,
        name: breed.name,
        weight: weight,
        origin: origin,
        age: age,
      });
    };
    const banAttribute=(type,value)=>{
      setBanned((prev) => {
      if (!prev[type].includes(value)) {
        return {
          ...prev,
          [type]: [...prev[type], value],
        };
      }
      return prev;
    });

    }
    const removeBanned = (type, value) => {
      setBanned((prev) => ({
        ...prev,
        [type]: prev[type].filter((v) => v !== value),
      }));
    };


    return (
        <div className='whole-page'>
          <h1>Veni Venci!</h1>
          <h3>Discover all the dogs</h3>
          {currentImage && (
            <div className='discover'>
              <h2 className='dog-name'>{currentImage.name}</h2>
              <div className="attributes">
                <button onClick={() => banAttribute("weight", currentImage.weight)}>
                  Weight: {currentImage.weight} kg
                </button>
                <button onClick={() => banAttribute("origin", currentImage.origin || "Unknown")}>
                  Origin: {currentImage.origin || "Unknown"}
                </button>
                <button onClick={() => banAttribute("age", currentImage.age)}>
                  Life Span: {currentImage.age}
                </button>
              </div>
              <img src={currentImage.url} alt="Dog returned"/>
              </div>
          )}
          <button onClick={submit}>Discover New Dog!</button>
          <div className='banned'>
            <h2>Banned Attributes</h2>
            <ul>
              {Object.entries(banned).map(([type, values]) => (
                <li key={type}>
                  <strong>{type}:</strong>{" "}
                  {values.length === 0
                    ? "None"
                    : values.map((val) => (
                        <button
                          key={val}
                          onClick={() => removeBanned(type, val)}
                        >
                          {val} 
                        </button>
                      ))}
                </li>
              ))}
            </ul>
          </div>
      </div>
  )
}

export default App
