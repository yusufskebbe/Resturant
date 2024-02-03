import React, { useEffect, useState } from 'react'
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

//Fetching data from backend

const requestConfig = {}

function Meals() {



  //custome hook
const {data:loadedMeals, isLoading, error} = useHttp('http://localhost:3000/meals', requestConfig, [])


if(isLoading){
  return <p className='center'>Fetching meals....</p>
}

if(error){
  return <Error title='failed to fetch meals' message={error}/>
}


/// handling data from normal hook
// const [loadedMeals, setLoadedMeals] = useState([])

// useEffect(()=>{
//   async function fetchMeals(){

 
//     const response = await fetch('http://localhost:3000/meals');

//     if(!response.ok){

//       alert('meals not renderd well')

//     }

//    const meals = await response.json()
//    setLoadedMeals(meals)

//    console.log(loadedMeals);
 
// }

// fetchMeals()

// },[])


  return (
    <ul id='meals'>{loadedMeals.map((meal) => (
      <MealItem key={meal.id} meal={meal}/>
    ))}</ul>
  )
}

export default Meals