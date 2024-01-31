import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';

//Fetching data from backend

function Meals() {

  
const [loadedMeals, setLoadedMeals] = useState([])

useEffect(()=>{
  async function fetchMeals(){

 
    const response = await fetch('http://localhost:3000/meals');

    if(!response.ok){

      alert('meals not renderd well')

    }

   const meals = await response.json()
   setLoadedMeals(meals)

   console.log(loadedMeals);
 
}

fetchMeals()

},[])


  return (
    <ul id='meals'>{loadedMeals.map((meal) => (
      <MealItem key={meal.id} meal={meal}/>
    ))}</ul>
  )
}

export default Meals