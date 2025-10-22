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
        <button onClick={handleAddBob}>Add Bob</button>
      </div>
    </div>
  )
}
export default Page
