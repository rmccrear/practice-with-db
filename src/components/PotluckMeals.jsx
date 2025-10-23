import {useState} from "react"
import supabase from "../utils/supabase"

export default function PotluckMeals() {

    const [meals, setMeals] = useState([])
    
    async function handleFetchMeals(){
        const result = await supabase.from("potluck_meals").select()
        const data = result.data
        console.log(data);
        setMeals(data);
    }

    return <>
        <h1>Potluck meals</h1>
        <button onClick={handleFetchMeals}>Fetch Meals</button>
        
    </>
}
