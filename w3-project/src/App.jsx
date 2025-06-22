import './App.css';
import { cardList } from './data.js';
import React, { useState } from 'react';

const App = () => {
  const [deck, setDeck] = useState([...cardList]);
  const [count,setCount] = useState(0);
  const [question, setQuestion] = useState(true);
  let page = deck[count];

  function shuffleCard(list){
    const newList = [...list];
    for (let i = newList.length - 1; i > 0; i--) 
      {
    const j = Math.floor(Math.random() * (i + 1));
    [newList[i], newList[j]] = [newList[j], newList[i]];
    }
    setDeck(newList);
    setCount(0);
    setCorrect(null);
    setInput('');

  }

  function handlePrevious(){
    setQuestion(true);
    setCount(count-1);
    setCorrect(null);
    setInput('');

  }
  function handleNext(){
    setQuestion(true);
    setCount(count+1);
    setCorrect(null);
    setInput('');
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
  const [input, setInput] = useState('');

  const [correct, setCorrect] = useState(null);

  function handleInput(e){
    const value = e.target.value;
    setInput(value);
    setCorrect(null);
  }
  const handleSubmit =(event) =>{
    event.preventDefault();
    if (input.trim().toLowerCase() === page.answer.trim().toLowerCase()) {
    setCorrect(true);
    alert('Correct! 🎉');

  } else {
    setCorrect(false);
    alert('Try again!');
  }
  };

  return (
    

    <div className="App">
        <title>Chemistry Quiz</title>
        <h1>Test Your Chemistry Knowledge!</h1>
        <h2>How well do you know chemistry? Take the challenge now!</h2>
        <h3>Number of cards: {deck.length}</h3>
        <div className='container'>
          <div className= {`card ${question ? "" : "flipped"}`} onClick={toggleQA}> 
          {text}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='response'>
            <h3>Guess the answer here: </h3>
            <input type='text' value={input} onChange={handleInput}  placeholder = 'Place your answer here...'className={`input ${correct === null ? '' : correct ? 'correct' : 'incorrect'}`}></input>
            <button type='submit' className='submit'>Submit</button>
          </div>     
        </form>
        <div className= 'option'>
          <button onClick={handlePrevious} disabled={count==0}> ←</button>
          <button onClick={handleNext} disabled = {count == deck.length-1}>→</button>
          <button onClick={() => shuffleCard(deck)}>Shuffle</button>
        </div>
    </div>
  )
}

export default App
