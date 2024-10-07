import { useState } from 'react'

const TouristForm = () => {
   
    const [isVisible, setIsVisible] = useState(false);
  const [Username, setUsername] = useState('')
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [MobileNumber, setMobileNumber] = useState('')
  const [Nationalty, setNationalty] = useState('')
  const [DOB, setDOB] = useState('')
  const [Job, setJob] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const tourist = {Username, Email, Password,MobileNumber,Nationalty,DOB,Job}
    
    const response = await fetch('/api/TouristRoute', {
      method: 'POST',
      body: JSON.stringify(tourist),
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
      setUsername('')
      setEmail('')
      setPassword('')
      setJob('')
      setDOB('')
      setNationalty('')
      setMobileNumber('')
    
      console.log('new tourist added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} Sign up
      </button>
    {isVisible && (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Tourist Signup</h3>

      <label> Username:</label>
      <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={Username}
      />

      <label>Email :</label>
      <input 
        type="text" 
        onChange={(e) => setEmail(e.target.value)} 
        value={Email}
      />

      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />

<label>Mobile Number:</label>
      <input 
        type="text" 
        onChange={(e) => setMobileNumber(e.target.value)} 
        value={MobileNumber} 
      />

<label>Job:</label>
      <input 
        type="text" 
        onChange={(e) => setJob(e.target.value)} 
        value={Job} 
      />

<label>Nationalty:</label>
      <input 
        type="Nationalty" 
        onChange={(e) => setNationalty(e.target.value)} 
        value={Nationalty} 
      />
       <label>DOB:</label>
      <input 
        type="date" 
        onChange={(e) => setDOB(e.target.value)} 
        value={DOB} 
      />

      <button>  Signup</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default TouristForm