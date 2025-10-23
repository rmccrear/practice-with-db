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

    async function handleAddMeal(event){
        event.preventDefault()
        console.log("handle add meal submitted")
        const mealName = event.target.elements.mealName.value
        const guestName = event.target.elements.guestName.value
        const serves = event.target.elements.serves.value
        const kindOfDish = event.target.elements.kindOfDish.value
        const newMeal = {
            meal_name: mealName,
            guest_name: guestName,
            serves: serves,
            kind_of_dish: kindOfDish
        }
        console.log(newMeal)
        await supabase.from("potluck_meals").insert(newMeal)
        const response = await supabase.from("potluck_meals").select()
        const data = response.data
        setMeals(data)
        event.target.elements.mealName.value = ""
        event.target.elements.guestName.value = ""
        event.target.elements.serves.value = ""
        event.target.elements.kindOfDish.value = ""
    }


    return <>
        <h1>Potluck meals</h1>
        <button onClick={handleFetchMeals}>Fetch Meals</button>
        <ul>
            {mealsDisplay}
        </ul>
        <div>
            <form onSubmit={handleAddMeal}>
                <label>
                    Meal: <input type="text" name="mealName" />
                </label>
                <br/>
                <label>
                    Guest: <input type="text" name="guestName" />
                </label>
                <br/>
                <label>
                    Serves: <input type="number" name="serves" />
                </label>
                <br/>
                <label>
                    Kind of Dish:
                    <select name="kindOfDish" defaultValue="">
                        <option value="" disabled>Select a kind</option>
                        <option value="entree">Entree</option>
                        <option value="side">Side</option>
                        <option value="snack">Snack</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                    </select>
                </label>
                <br/>
                <button type="submit">Add Meal</button>
            </form>
        </div>

    </>
}
