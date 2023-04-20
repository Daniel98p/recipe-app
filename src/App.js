import { useState, useEffect } from "react";
import myApiKey from './api_key.txt'
import './App.css';


function App() {

const [recipeData, setRecipeData] = useState({});
const [apiKey, setApiKey] = useState('');
const [expandedIndex, setExpandedIndex] = useState(-1);

const toggleDescription = (index) => {
  if (index === expandedIndex) {
    setExpandedIndex(-1);
  } else {
    setExpandedIndex(index);
  }
};

useEffect(() => {
  fetch(myApiKey)
    .then(response => response.text())
    .then(text => setApiKey(text.trim()))
    .catch(error => console.error(error));
}, []);


useEffect(() => {
  if (apiKey) {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
      }
    };

    fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
      .then(response => response.json())
      .then(response => setRecipeData(response))
      .catch(error => console.error(error));
  }
}, [apiKey]);
  return (
    <>
    <h1 className="header">Avesome recipie list</h1>
    {recipeData?.results && (
      recipeData.results.map((result, index) => {
        if (result.description && result.instructions){
        return(
          <div className="recipies-container">
            <p className="name" key={index} onClick={() => toggleDescription(index)}>{result.name}</p>
            <p className={`description ${expandedIndex === index ? 'show' : 'hide'}`} key={result.id}>{result.description}</p>
            <ul>
            {
              result.instructions.map((instruction) => {
              return <li className={`instruction ${expandedIndex === index ? 'show' : 'hide'}`}  key={instruction.id}>{instruction.display_text}</li>
            })
            }
            </ul>
          </div>
        )}
        else{
          return null
        }
      })
    )}
    </>
  );
}

export default App;
