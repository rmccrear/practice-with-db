# React + Supabase Potluck App - Student Learning Guide

This comprehensive guide will walk you through building a React application with Supabase database integration. You'll create a potluck meal management app that demonstrates CRUD operations, form handling, and database security policies.

## Table of Contents
1. [Project Setup](#project-setup)
2. [Database Setup](#database-setup)
3. [Supabase Integration](#supabase-integration)
4. [Basic Data Display](#basic-data-display)
5. [Form Implementation](#form-implementation)
6. [Data Insertion](#data-insertion)
7. [Form Enhancement](#form-enhancement)
8. [Bonus Challenges](#bonus-challenges)

---

## Project Setup

### Step 1: Initialize React Project with Vite

Create a new React project using Vite:

```bash
npm create vite@latest practice-with-db -- --template react
cd practice-with-db
npm install
```

### Step 2: Install Supabase Client

Add the Supabase JavaScript client to your project:

```bash
npm install @supabase/supabase-js
```

### Step 3: Project Structure

Your project should have this structure:
```
practice-with-db/
├── src/
│   ├── components/
│   │   └── PotluckMeals.jsx
│   ├── utils/
│   │   └── supabase.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

---

## Database Setup

### Step 4: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new account
2. Create a new project
3. Note down your project URL and anon key from Settings > API

### Step 5: Create Database Table

In your Supabase SQL Editor, run this query to create the `potluck_meals` table:

```sql
CREATE TABLE potluck_meals (
  id BIGSERIAL PRIMARY KEY,
  meal_name TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  serves INTEGER NOT NULL,
  kind_of_dish TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Step 6: Insert Sample Data

Add at least 3 sample meals to your table:

```sql
INSERT INTO potluck_meals (meal_name, guest_name, serves, kind_of_dish) VALUES
('Meatloaf', 'Bill', 7, 'entree'),
('Caesar Salad', 'Sarah', 4, 'side'),
('Chocolate Cake', 'Mike', 8, 'dessert');
```

**Screenshot Reference:** ![Sample data in database](./docs/00-screenshot-list-meals-db-table.png)

### Step 7: Set Row Level Security (RLS) Policy

Enable RLS and create a read policy:

```sql
-- Enable RLS
ALTER TABLE potluck_meals ENABLE ROW LEVEL SECURITY;

-- Create read policy for all users
CREATE POLICY "Allow read access for all users" ON potluck_meals
FOR SELECT USING (true);
```

---

## Supabase Integration

### Step 8: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Important:** Never commit this file to version control!

### Step 9: Set Up Supabase Client

Create `src/utils/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
```

---

## Basic Data Display

### Step 10: Create PotluckMeals Component

Create `src/components/PotluckMeals.jsx`:

```javascript
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
        mealsDisplay.push(
            <li key={meals[i].id}> 
                {meals[i].meal_name} by {meals[i].guest_name} serves {meals[i].serves} ( {meals[i].kind_of_dish} ) 
            </li>
        )
    }

    return <>
        <h1>Potluck meals</h1>
        <button onClick={handleFetchMeals}>Fetch Meals</button>
        <ul>
            {mealsDisplay}
        </ul>
    </>
}
```

### Step 11: Import Component in App.jsx

Update `src/App.jsx`:

```javascript
import PotluckMeals from './components/PotluckMeals'

function App() {
  return (<>
    <PotluckMeals/>
  </>)
}

export default App
```

### Step 12: Test Data Fetching

1. Run your development server: `npm run dev`
2. Click the "Fetch Meals" button
3. Verify that your meals are displayed

**Screenshot Reference:** ![Meals displayed in app](./docs/01-screenshot-list-meals.png)

---

## Form Implementation

### Step 13: Add Form Structure

Add a form to your `PotluckMeals` component:

```javascript
// Add this inside your return statement, after the ul element
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
            Kind of Dish: <input type="text" name="kindOfDish" />
        </label>
        <br/>
        <button type="submit">Add Meal</button>
    </form>
</div>
```

**Screenshot Reference:** ![Form added](./docs/02-screenshot-form.png)

### Step 14: Add Form Event Handler

Add the `handleAddMeal` function to your component:

```javascript
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
        serves: parseInt(serves),
        kind_of_dish: kindOfDish
    }
    
    console.log(newMeal)
    // We'll add the insert logic in the next step
}
```

---

## Data Insertion

### Step 15: Create Insert RLS Policy

In your Supabase SQL Editor, add an insert policy:

```sql
CREATE POLICY "Allow insert access for public" ON potluck_meals
FOR INSERT WITH CHECK (true);
```

**Screenshot Reference:** ![RLS Policy for inserts](./docs/03-screenshot-custom-rls-policy.png)

**Note:** If you encounter an error, check the policy syntax. Common issues include missing quotes or incorrect syntax.

**Screenshot Reference:** ![Potential RLS error](./docs/04-screenshot-potential-rls-error.png)

### Step 16: Implement Insert Functionality

Update your `handleAddMeal` function:

```javascript
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
        serves: parseInt(serves),
        kind_of_dish: kindOfDish
    }
    
    console.log(newMeal)
    
    // Insert the new meal
    await supabase.from("potluck_meals").insert(newMeal)
    
    // Refresh the meals list
    const response = await supabase.from("potluck_meals").select()
    const data = response.data
    setMeals(data)
}
```

### Step 17: Test Insert Functionality

1. Fill out the form with new meal data
2. Submit the form
3. Verify the meal appears in your Supabase dashboard

**Screenshot Reference:** ![Verify insert in Supabase](./docs/05-screenshot-verify-insert.png)

**Screenshot Reference:** ![Display meals after submit](./docs/06-display-meals-after-submit.png)

### Step 18: Clear Form Inputs

Update your `handleAddMeal` function to clear the form after submission:

```javascript
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
        serves: parseInt(serves),
        kind_of_dish: kindOfDish
    }
    
    console.log(newMeal)
    
    // Insert the new meal
    await supabase.from("potluck_meals").insert(newMeal)
    
    // Refresh the meals list
    const response = await supabase.from("potluck_meals").select()
    const data = response.data
    setMeals(data)
    
    // Clear the form inputs
    event.target.elements.mealName.value = ""
    event.target.elements.guestName.value = ""
    event.target.elements.serves.value = ""
    event.target.elements.kindOfDish.value = ""
}
```

**Screenshot Reference:** ![Clear inputs after submit](./docs/07-screenshot-clear-inputs.png)

---

## Form Enhancement

### Step 19: Add Select Dropdown

Replace the text input for "Kind of Dish" with a select dropdown:

```javascript
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
```

**Screenshot Reference:** ![Option select dropdown](./docs/08-screenshot-option-select.png)

---

## Bonus Challenges

Complete at least 2 of the following challenges:

### Challenge 1: Beverages Table and Component
Create a similar table and component for beverages following the same pattern as meals.

### Challenge 2: Utensils Table and Component
Create a table for utensils (paper plates, plastic cups, etc.) and build a component to manage them.

### Challenge 3: Creative Table
Design your own table that would improve the potluck app (e.g., dietary restrictions, allergies, etc.).

### Challenge 4: Styling
Style your app using CSS or Bootstrap to make it more visually appealing.

### Challenge 5: Conditional Styling
Add conditional styling based on the type of dish or other data.

### Challenge 6: Creative Display
Use elements other than `<li>` tags to display your items (cards, tables, etc.).

### Challenge 7: Component Breakdown
Break your app into smaller, reusable components with props.

### Challenge 8: File Upload
Implement file upload functionality using Cloudinary or Supabase Storage.

---

## Complete Code Example

Here's the complete `PotluckMeals.jsx` component:

```javascript
import { useState } from "react"
import supabase from "../utils/supabase"

export default function PotluckMeals() {
    const [meals, setMeals] = useState([])

    async function handleFetchMeals() {
        const result = await supabase.from("ktmluck_meals").select()
        const data = result.data
        console.log(data);
        setMeals(data);
    }

    const mealsDisplay = []
    for (let i = 0; i < meals.length; i++) {
        mealsDisplay.push(
            <li key={meals[i].id}> 
                {meals[i].meal_name} by {meals[i].guest_name} serves {meals[i].serves} ( {meals[i].kind_of_dish} ) 
            </li>
        )
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
            serves: parseInt(serves),
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
```

---

## Learning Objectives

By completing this project, you will have learned:

1. **React Fundamentals**: Component creation, state management, event handling
2. **Supabase Integration**: Database connection, CRUD operations
3. **Form Handling**: Form submission, input validation, data processing
4. **Database Security**: Row Level Security (RLS) policies
5. **Environment Variables**: Secure credential management
6. **Async/Await**: Handling asynchronous operations
7. **Component Architecture**: Breaking down applications into reusable pieces

---

## Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading**: Make sure your `.env.local` file is in the project root and variables start with `VITE_`
2. **RLS Policy Errors**: Check SQL syntax and ensure policies are properly quoted
3. **CORS Issues**: Verify your Supabase URL and keys are correct
4. **Form Not Submitting**: Ensure you have `event.preventDefault()` in your handler

### Getting Help:

- Check the browser console for error messages
- Verify your Supabase dashboard for data changes
- Review the Supabase documentation for API reference
- Use `console.log()` statements to debug data flow

---

## Next Steps

After completing this project, consider exploring:

- User authentication with Supabase Auth
- Real-time subscriptions with Supabase Realtime
- File storage with Supabase Storage
- Advanced React patterns (Context API, custom hooks)
- Testing with React Testing Library
- Deployment with Vercel or Netlify

Happy coding! 🚀
