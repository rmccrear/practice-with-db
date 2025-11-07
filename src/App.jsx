import { useState } from 'react';
import PotluckMeals from './components/PotluckMeals'
import DUMMY_USER from "./data/user.json"
import supabase from './utils/supabase';


// let user = DUMMY_USER
// console.log(user)
// set undefined for guest
// user=undefined;


function App() {
  const [user, setUser] = useState(null);

  async function handleLogin(event) {
    event.preventDefault();
    const email = event.target.elements.emailInput.value;
    const password = event.target.elements.passwordInput.value;
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if(data.user) {
      setUser(data.user);
    }
    if(error) {
      console.log(error);
      alert(error);
    }
  }

  const loginForm = (<div>
    <h3>Login</h3>
    <form onSubmit={handleLogin}>
      <label htmlFor="emailInput">Email: </label>
      <input type="email" name="emailInput" id="emailInput"/>
      <br />
      <label htmlFor="passwordInput">Password: </label>
      <input type="password" name="passwordInput" id="passwordInput"/>
      <button type="submit">Login</button>
    </form>
  </div>);

  return (<>
    <h1>Welcome {user ? user.email : "Guest"}</h1>
    {!user && loginForm}
    <PotluckMeals user={user} />
  </>)
}
export default App
