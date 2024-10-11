import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MuseumForm = () => {
   
  const [isVisible, setIsVisible] = useState(false);
 
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pictures, setPictures] = useState('')
  const [location, setLocation] = useState('')
  const [openingHours, setOpeningHours] = useState('')
  const [ticketPrices, setTicketPrices] = useState('')
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([]);

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const museum = {name,description,pictures,location,openingHours,ticketPrices,tag}
    
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
      setTag('')
   
    
      console.log('new museum added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    // Fetch tags from the backend
    axios.get('/api/tagroute')  
      .then(response => {
        setTags(response.data);
      })
      .catch(error => {
        setError('Failed to fetch tags');
      });
  }, []);

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
       <label>Tag:</label>
        <select 
          onChange={(e) => setTag(e.target.value)} 
          value={tag}
        >
          <option value="">Select a tag</option>
          {tags.map(tag => (
            <option key={tag._id} value={tag._name}>{tag.name}</option>
          ))}
        </select>

      <button>  Create Museum</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}

export default MuseumForm