import { useState } from 'react'
import PotluckMeals from './components/PotluckMeals'
import LoginPage from './LoginPage'
import DUMMY_USER from "./data/user.json"


// let user = DUMMY_USER
// console.log(user)
// set undefined for guest
// user=undefined;


function App() {
  const [user, setUser] = useState(null)

  function loginComplete(user, error){
    if(!error){
      setUser(user)
    } else {
      alert(error)
    }
  }

  return (<>
    <h1>Welcome {user ? user.email : "Guest"}</h1>
    {!user && <LoginPage loginComplete={loginComplete}/>}
    <PotluckMeals user={user}/>
  </>)
}
export default App
