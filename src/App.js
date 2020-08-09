import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';
import Recipe from './components/Recipe';
import {v4 as uuidv4} from 'uuid';
import Alert from './components/Alert';


function App() {

  const[query,setQuery] = useState("");
  const[recipes,setRecipes]=useState([]);
  const[alert,setAlert]=useState(""); 

  const API_ID ="0549217e";

  const APP_KEY ="6f23c5b464e36d06968c7f390bf1e0bc";

  const url = `https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${APP_KEY}`;


  const getData = async() => {
    if (query!=="") {
      const result = await Axios.get(url);
      if(!result.data.more){
       return setAlert("No food with such name!!")
      }
      setRecipes(result.data.hits)
      console.log(result)
      setAlert("")
      setQuery("")

    } else {
      setAlert('Please give the recipe name!!')
    }
    
  }
  

  const onChange = (e) => {

    console.log(e.target.value);
    setQuery(e.target.value);


  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }
  return (
    <div className="App">
     
       <h1 >Food recipe!!</h1>
       <form className ="search-form" onSubmit ={onSubmit}>
            {alert!==""&&<Alert alert={alert} />}
            <input type ="text" placeholder ="Search your Food...." autoComplete ="off"  
            onChange ={onChange}
            value = {query}/>

             <input  type ="submit" value ="Search"  />
       </form>
    <div className="recipes">
    {recipes !==[] &&
    recipes.map(recipe => <Recipe key ={uuidv4()} recipe={recipe} />)}

    </div>
    </div>
  );
}

export default App;
