import './App.css';
import { cardList } from './data.js';
import React, { useState } from 'react';

const App = () => {

  const [count,setCount] = useState(0);
  const [question, setQuestion] = useState(true);
  let page = cardList[count];

  function handlePrevious(){
    setQuestion(true);
    if(count == 0)
    {
      setCount(cardList.length-1);
    }
    else
    {
      setCount(count-1);
    }
  }
  function handleNext(){
    const randomIndex = Math.floor(Math.random() * cardList.length);
    setQuestion(true);
    if(count == cardList.length-1)
    {
      setCount(randomIndex);
    }
    else{
      setCount(randomIndex);
    }
  }
  let text;
  if(question)
  {
    text = page.question;
  }
  else{
    text = page.answer;
  }
  function toggleQA(){
    if(question)
    {    
      setQuestion(false);
    }
    else{
      setQuestion(true);
    }
  }

  return (
    

    <div className="App">
        <title>Chemistry Quiz</title>
        <h1>Test Your Chemistry Knowledge!</h1>
        <h2>How well do you know chemistry? Take the challenge now!</h2>
        <h3>Number of cards: {cardList.length}</h3>
        <div className='container'>
          <div className= {`card ${question ? "" : "flipped"}`} onClick={toggleQA}> 
          {text}
          </div>
        </div>
        <button onClick={handlePrevious}> ←</button>
        <button onClick={handleNext}>→</button>
        <h3>Page: {count+1}</h3>

    </div>
  )
}

export default App