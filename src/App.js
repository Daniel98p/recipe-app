import { useState, useEffect } from "react";


function App() {

const [recipeData, setRecipeData] = useState({});
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd5c5d53983msh58a28aba6d7504ep151602jsn171f10339aec',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
	}
};

useEffect(() => {
  fetch('https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes', options)
	.then(response => response.json())
	.then(response => setRecipeData(response))
	.catch(err => console.error(err));
}, [])

  return (
    <>
    {recipeData?.results && (
      <p className="name">{recipeData.results[0].name}</p>
    )}
    {recipeData?.results && (
      <p className="description">{recipeData.results[0].description}</p>
    )}
    {recipeData?.results && (
      <p className="instruction">{recipeData.results[0].instructions[0].display_text}</p>
    )}
    {recipeData?.results && (
      <p className="instruction">{recipeData.results[0].instructions[1].display_text}</p>
    )}
    {recipeData?.results && (
      <p className="instruction">{recipeData.results[0].instructions[2].display_text}</p>
    )}
    {recipeData?.results && (
      <p className="instruction">{recipeData.results[0].instructions[3].display_text}</p>
    )}
    </>
  );
}

export default App;
