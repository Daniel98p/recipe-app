import { useState, useEffect } from "react";
import myApiKey from './api_key.txt'
import './App.css';


function App() {

const [recipeData, setRecipeData] = useState({});
const [apiKey, setApiKey] = useState('');

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
    {recipeData?.results && (
      recipeData.results.map((result, index) => {
        if (result.description && result.instructions){
        return(
          <div>
            <p className="name" key={index}>{result.name}</p>
            <p className="description" key={result.id}>{result.description}</p>
            <ul>
            {
              result.instructions.map((instruction) => {
              return <li className="instruction" key={instruction.id}>{instruction.display_text}</li>
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
