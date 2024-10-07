import AdminForm from '../components/adminForm'
import GovernerForm from '../components/governerForm'
import DeleteAdmin from '../components/DeleteAdmin'
import CategoryForm from '../components/categoryForm'
import { useEffect, useState } from "react"
import CategoryDetails from "../components/categoryDetails"
const AdminSignup= () => {
  const [catogeries, setCatogery] = useState(null)
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const fetchWorkouts = async () => {
        const response = await fetch('/api/categoryRoutes')
        const json = await response.json()
  
        if (response.ok) {
          setCatogery(json)
        }
      }
  
      fetchWorkouts()
    }, [])

    const handleClick = () => {
      setIsVisible(!isVisible);
    };
  return (

      <div>
         <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'}  Categories
      </button>
      {isVisible && (
        <div className="workouts">
        {catogeries && catogeries.map(Catogery => (
          <CategoryDetails Catogery={Catogery} key={Catogery._id} />
        ))}
      </div>
      )}
        <AdminForm/>
        <br/>
        <GovernerForm/>
        <br/>
        <DeleteAdmin/>
        <br/>
        <CategoryForm/>

    </div>   
  )
}

export default AdminSignup