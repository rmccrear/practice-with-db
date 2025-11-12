import { useState } from "react"
import supabase from "../utils/supabase"
import { filterMealsByKind } from "../utils/filter-helpers"

export default function PotluckMeals({ user }) {
    // const {user} = props;

    const [mealKind, setMealKind] = useState("all")
    const [meals, setMeals] = useState([])
    // const a = useState([]) // 🤮
    // const meals = a[0]
    // const setMeals = a[1]

    async function handleFetchMeals() {
        const { data, error } = await supabase.from("potluck_meals").select().eq("user_id", user.id)
        // const result = await supabase.from("potluck_meals").select().eq("user_id", user.id)
        // const data = result.data
        // const error = result.error;
        console.log(data);
        console.log(error);
        setMeals(data);
    }

    const filteredMeals = filterMealsByKind(meals, mealKind)

    const mealsDisplay = []
    for (let i = 0; i < filteredMeals.length; i++) {
        mealsDisplay.push(<li key={filteredMeals[i].id}> {filteredMeals[i].meal_name} by {filteredMeals[i].guest_name} serves {filteredMeals[i].serves} ( {filteredMeals[i].kind_of_dish} ) </li>)
    }

    async function handleAddMeal(event) {
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
            kind_of_dish: kindOfDish,
            user_id: user.id
        }
        console.log(newMeal)
        await supabase.from("potluck_meals").insert(newMeal)
        const response = await supabase.from("potluck_meals").select().eq("user_id", user.id)
        const data = response.data
        setMeals(data)
        event.target.elements.mealName.value = ""
        event.target.elements.guestName.value = ""
        event.target.elements.serves.value = ""
        event.target.elements.kindOfDish.value = ""
    }


    return <>
        <h1>Potluck meals for {user ? user.name : "Guest"}</h1>
        <button onClick={handleFetchMeals}>Fetch Meals</button>
        <button onClick={() => { setMealKind("entree") }}>Entrees</button>
        <button onClick={() => { setMealKind("side") }}>Sides</button>
        <button onClick={() => { setMealKind("all") }}>All</button>
        <ul>
            {mealsDisplay}
        </ul>
        <div>
            <form onSubmit={handleAddMeal}>
                <label>
                    Meal: <input type="text" name="mealName" />
                </label>
                <br />
                <label>
                    Guest: <input type="text" name="guestName" />
                </label>
                <br />
                <label>
                    Serves: <input type="number" name="serves" />
                </label>
                <br />
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
                <br />
                <button type="submit">Add Meal</button>
            </form>
        </div>

    </>
}
