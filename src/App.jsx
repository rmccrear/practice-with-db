import PotluckMeals from './components/PotluckMeals'
import DUMMY_USER from "./data/user.json"


let user = DUMMY_USER
console.log(user)
// set undefined for guest
// user=undefined;


function App() {
  return (<>
    <h1>Welcome {user ? user.name : "Guest"}</h1>
    <PotluckMeals user={user}/>
  </>)
}
export default App
