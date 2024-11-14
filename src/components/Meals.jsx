import { useState,useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../assets/hooks/useHTTP";
const reqconfig={}
export default function Meals(){
   const{data: loadedMeals,
    isLoading,error}= useHttp('http://localhost:3000/meals',reqconfig,[])
    if (isLoading){
        return <p className="centre">Fetching...</p>
    }

return(
<ul id='meals'> {loadedMeals.map((meal)=>
   <MealItem key={meal.id} meal={meal}/>
)}

</ul>
)


}