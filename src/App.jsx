import { useState, useEffect } from 'react'
import supabase from './utils/supabase'

function Page() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function getEmployees() {
      const { data: employees } = await supabase.from('employees').select()

      if (employees.length > 1) {
        setEmployees(employees)
      }
    }

    getEmployees()
  }, [])

  async function addEmployee(firstName, lastName, favIceCream, shift) {
    const newEmployee = {
      first_name: "Bob",
      last_name: "Dole",
      fav_ice_cream: "Rocky Road",
      shift: "morning",
      date_of_hire: "2025-10-21"
    }
    const { data } = await supabase.from('employees').insert(newEmployee)
  }

  function handleAddBob() {
    addEmployee();
  }

  async function handleSubmit(event) {
    event.preventDefault()
    console.log("in handle submit")
    console.log(event)
    const firstName = event.target.elements.firstName.value
    const lastName = event.target.elements.lastName.value
    const favIceCream = event.target.elements.favIceCream.value
    console.log(firstName, lastName, favIceCream)

    const newEmployee = {
      first_name: firstName,
      last_name: lastName,
      fav_ice_cream: favIceCream
    }
    console.log(newEmployee)
    await supabase.from("employees").insert(newEmployee)

    // get fresh data
    const response = await supabase.from("employees").select()
    const data = response.data
    console.log(data)
    setEmployees(data)
    
    event.target.elements.firstName.value = ""
    event.target.elements.lastName.value = ""
    event.target.elements.favIceCream.value = "" 
  }


  return (
    <div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.first_name} | Favorite Ice Cream: {" "}
            {employee.fav_ice_cream}
          </li>
        ))}
      </ul>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              First Name:
              <input type="text" name="firstName" id="firstName" />
            </label>
          </div>
          <div>
            <label>
              Last Name:
              <input type="text" name="lastName" id="lastName" />
            </label>
          </div>
          <div>
            <label>
              Favorite Ice Cream:
              <input type="text" name="favIceCream" id="favIceCream" />
            </label>
          </div>
          <div>
            <button type="submit">Add Employee</button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Page
