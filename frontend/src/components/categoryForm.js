// import { useState } from 'reac
import {useState} from 'react'
const AdminForm = () => {
   
  const [isVisible, setIsVisible] = useState(false);
 
  const [name, setName] = useState('')
  

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const advertiser = {name}
    
    const response = await fetch('/api/categoryRoutes', {
      method: 'POST',
      body: JSON.stringify(advertiser),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setError(null)
    
      
      setName('')
   
    
      console.log('new tourist added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
         Create Category
      </button>
    {isVisible && (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Create Activity</h3>

<label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      

      <button>  Create Category</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default AdminForm