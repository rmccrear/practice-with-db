import { useState, useEffect } from 'react'
import supabase from './utils/supabase'

function Page() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    async function getEmployees() {
      const { data } = await supabase.from('employees').select()

      if (data.length > 1) {
        setEmployees(data)
      }
    }

    getEmployees()
  }, [])

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
    </div>
  )
}
export default Page
