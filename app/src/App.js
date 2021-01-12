
import './App.css';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';

const APP_ID='a50042cf';
const APP_KEY='fced5c0cf7175a8a19ff024ad227777a';



const App=()=>{

const [recipes,setRecipes]=useState([]);
const [search,setSearch]=useState("");
const [query,setQuery]=useState('chicken'); 



useEffect(()=>{
  getRecipes()
},[query]);

const getRecipes=async()=>{
  const res=await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
  const data= await res.json();
  setRecipes(data.hits);
  //console.log(data);
}

const getSearch=e=>{
  e.preventDefault();
  setQuery(search);
  setSearch("");
}

const updateSeacrh=e=>{
setSearch(e.target.value);
};







return(
  <div className="App">
  <form className="search-form" onSubmit={getSearch}>
    <input className="search-bar" type="text" value={search} onChange={updateSeacrh}/>
    <button  className="search-btn" type="submit">Submit</button>
  </form><div className="recipes">
  {recipes.map(recipe=>(<Recipe
    key={recipe.recipe.label}
    title={recipe.recipe.label} calories={recipe.recipe.calories}
    image={recipe.recipe.image}
    ingredients={recipe.recipe.ingredients}
  />))}
  </div>
  </div>
)


};


export default App;
