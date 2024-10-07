import { useState } from 'react'

const GovernerForm = () => {
   
  const [isVisible, setIsVisible] = useState(false);
 
  const [Username, setUsername] = useState('')
  const [Password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const advertiser = {Username,Password}
    
    const response = await fetch('/api/adminRoute/addTourismGovernor', {
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
    
      setPassword('')
      setUsername('')
   
    
      console.log('new tourist added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
         Create Tourism Governer
      </button>
    {isVisible && (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Create Activity</h3>

<label>Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={Username} 
      />
       <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />

      <button>  Create </button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default GovernerForm