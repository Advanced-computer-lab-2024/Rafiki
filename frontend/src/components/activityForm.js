import { useState } from 'react'

const ActivityForm = () => {
   
  const [isVisible, setIsVisible] = useState(false);
  const [Date, setDate] = useState('')
  const [Time, setTime] = useState('')
  const [Price, setPrice] = useState('')
  const [Category, setCategory] = useState('')
  const [Tags, setTags] = useState('')
  const [specialDiscounts, setspecialDiscounts] = useState('')
//   const [Job, setJob] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const advertiser = {Date, Time, Price,Category,Tags,specialDiscounts}
    
    const response = await fetch('/api/ActivityRoute', {
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
      setDate('')
      setTime('')
      setPrice('')
    //   setJob('')
      setspecialDiscounts('')
      setTags('')
      setCategory('')
    
      console.log('new tourist added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
     Create Activity
      </button>
    {isVisible && (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Create Activity</h3>

      <label> Date:</label>
      <input 
        type="date" 
        onChange={(e) => setDate(e.target.value)} 
        value={Date}
      />

      <label>Time :</label>
      <input 
        type="text" 
        onChange={(e) => setTime(e.target.value)} 
        value={Time}
      />

      <label>Price:</label>
      <input 
        type="text" 
        onChange={(e) => setPrice(e.target.value)} 
        value={Price} 
      />

{/* <label>Mobile Number:</label>
      <input 
        type="text" 
        onChange={(e) => setCategory(e.target.value)} 
        value={Category} 
      /> */}

{/* <label>Job:</label>
      <input 
        type="text" 
        onChange={(e) => setJob(e.target.value)} 
        value={Job} 
      /> */}

<label>Tags:</label>
      <input 
        type="text" 
        onChange={(e) => setTags(e.target.value)} 
        value={Tags} 
      />
       <label>specialDiscounts:</label>
      <input 
        type="text" 
        onChange={(e) => setspecialDiscounts(e.target.value)} 
        value={specialDiscounts} 
      />

      <button>  Create</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default ActivityForm