import { useState } from 'react'

const MuseumForm = () => {
   
  const [isVisible, setIsVisible] = useState(false);
 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pictures, setPictures] = useState('')
  const [location, setLocation] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [ticketPrices, setTicketPrices] = useState('')
  const [createdAt, setCreatedAt] = useState('')

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const museum = {name,description,pictures,location,openingHours,ticketPrices,createdAt}
    
    const response = await fetch('/api/museumRoute', {
      method: 'POST',
      body: JSON.stringify(museum),
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
      setDescription('')
      setPictures('')
      setLocation('')
      setOpeningHours('')
      setTicketPrices('')
      setCreatedAt('')
   
    
      console.log('new museum added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
         Create Museum
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
      <label>Description:</label>
      <input 
        type="text" 
        onChange={(e) => setDescription(e.target.value)} 
        value={description} 
      />
       <label>Pictures:</label>
      <input 
        type="text" 
        onChange={(e) => setPictures(e.target.value)} 
        value={pictures} 
      />
       <label>Location:</label>
      <input 
        type="text" 
        onChange={(e) => setLocation(e.target.value)} 
        value={location} 
      />
       <label>openingHours:</label>
      <input 
        type="text" 
        onChange={(e) => setOpeningHours(e.target.value)} 
        value={openingHours} 
      />
       <label>ticketPrices:</label>
      <input 
        type="text" 
        onChange={(e) => setTicketPrices(e.target.value)} 
        value={ticketPrices} 
      />
       <label>createdAt:</label>
      <input 
        type="text" 
        onChange={(e) => setCreatedAt(e.target.value)} 
        value={createdAt} 
      />

      <button>  Create Museum</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default MuseumForm