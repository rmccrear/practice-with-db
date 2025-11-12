
export function filterMealsByKind(mealsArray, mealKindString) {
    const filteredMeals = []
    for (let i = 0; i < mealsArray.length; i++) {
        console.log(mealsArray[i])
        console.log(mealKindString)
        if (mealKindString === "all") {
            filteredMeals.push(mealsArray[i]);
        } else if (mealKindString === mealsArray[i].kind_of_dish) {
            filteredMeals.push(mealsArray[i]);
        }
    }
    return filteredMeals;
}