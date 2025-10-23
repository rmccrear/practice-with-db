# React + Supabase Demo

This educational project demonstrates how to integrate Supabase with a React application. The project showcases common database operations and authentication features using Supabase as a backend service.

## Project Overview

This is a step-by-step tutorial project that shows how to:
1. Set up a React project with Supabase
2. Configure environment variables for Supabase credentials
3. Create and handle forms in React
4. Perform CRUD operations with Supabase
5. Manage employee data in a database

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn
- A Supabase account and project

### Getting Started

1. First create your database and add a table called potluck_meals. The table should meals for a potluck. Use columns like "meal_name", "guest_name", "serves", "kind_of_dish" with examples like "Meatloaf", "Bill", 7, "entree" for a meatloaf brought by Bill that serves 7 people.

2. Next create at least 3 meals to bring in Supabase. [example screenshot(./docs/00-screenshot-list-meals-db-table.png)

3. Set RLS Policy for your table to allow "read access for all users"

4. Next, Create a component for PotluckMeals that shows all the dishes that your guests will bring. This will be imported into your App.jsx file and displayed there. [example screenshot](./docs/01-screenshot-list-meals.png)

5. Next, Create a form for a new meal, and insert an object into your database. 
    * add the form [example screenshot](./docs/02-screenshot-form.png)
    * add the event listener
    * add a custom RLS Policy to allow inserts from public [example screenshot](./docs/03-screenshot-custom-rls-policy.png) [potential error](./docs/04-screenshot-potential-rls-error.png)
    * insert the meal and verify in supabase [example screenshot](./docs/05-screenshot-verify-insert.png)
    * 
