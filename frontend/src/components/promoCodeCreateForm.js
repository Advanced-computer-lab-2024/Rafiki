import { useState } from 'react'

const CreatePromoCodes = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [code, setCode] = useState('')
  const [discount, setDiscount] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()


    
    const response = await fetch('/api/PromoCodeRoute', {
      method: 'POST',
      body: JSON.stringify({code,discount}),
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
    
      
      setCode('')
      setDiscount('')
   
    
      console.log('new Promo Code added:', json)
      
    }

  }
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button onClick={handleClick}>
         Create Promo Code
      </button>
    {isVisible && (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Create Promo Tag</h3>

<label>Code:</label>
      <input 
        type="text" 
        onChange={(e) => setCode(e.target.value)} 
        value={code} 
      />
    <label>Discount:</label>
      <input 
        type="text" 
        onChange={(e) => setDiscount(e.target.value)} 
        value={discount} 
      />
      

      <button>  Create Promo Code</button>
      {error && <div className="error">{error}</div>}
    </form>
    )}
    </div>
  )

}


export default CreatePromoCodes