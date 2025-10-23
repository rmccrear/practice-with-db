import { useState } from "react"
import supabase from "../utils/supabase"

export default function PotluckMeals() {

    const [meals, setMeals] = useState([])

    async function handleFetchMeals() {
        const result = await supabase.from("potluck_meals").select()
        const data = result.data
        console.log(data);
        setMeals(data);
    }

    const mealsDisplay = []
    for (let i = 0; i < meals.length; i++) {
        mealsDisplay.push(<li key={meals[i].id}> {meals[i].meal_name} by {meals[i].guest_name} serves {meals[i].serves} ( {meals[i].kind_of_dish} ) </li>)
    }


    return <>
        <h1>Potluck meals</h1>
        <button onClick={handleFetchMeals}>Fetch Meals</button>
        <ul>
            {mealsDisplay}
        </ul>
        <div>
            <form>
                <label>
                    Meal: <input type="text" name="mealName" />
                </label>
                <label>
                    Guest: <input type="text" name="guestName" />
                </label>
                <label>
                    Serves: <input type="number" name="serves" />
                </label>
                <label>
                    Kind of Dish (entree, side, snack): <input type="text" name="kind_of_dish" />
                </label>
                <button type="submit">Add Meal</button>
            </form>
        </div>

    </>
}
