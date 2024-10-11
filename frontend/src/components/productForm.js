import { useState } from 'react'

const ProductForm = () => {
   
    const [isVisible, setIsVisible] = useState(false);
  const [Name, setName] = useState('')
  const [Picture, setPicture] = useState('')
  const [Price, setPrice] = useState('')
  const [Description, setDescription] = useState('')
  const [Seller, setSeller] = useState('')
  const [Ratings, setRatings] = useState('')
  const [Reviews, setReviews] = useState('')
  const [AvailableQuantity, setAvailableQuantity] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const product = {Name,Picture,Price,Description,Seller,Ratings,Reviews,AvailableQuantity}
    
    const response = await fetch('api/productsRoute/addProduct', {
      method: 'POST',
      body: JSON.stringify(product),
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
     setPicture('')
     setPrice('')
     setDescription('')
     setSeller('')
     setRatings('')
     setReviews('')
     setAvailableQuantity('')       
     
      console.log('new product added:', json)
      
    }
}

const handleClick = () => {
  setIsVisible(!isVisible);
};

return (
  <div>
  <button onClick={handleClick}>
       Create Product
    </button>
  {isVisible && (
  <form className="create" onSubmit={handleSubmit}> 
    <h3>Create Product</h3>

<label>Name:</label>
    <input 
      type="text" 
      onChange={(e) => setName(e.target.value)} 
      value={Name} 
    />
    <label>Picture:</label>
    <input 
      type="text" 
      onChange={(e) => setPicture(e.target.value)} 
      value={Picture} 
    />
     <label>Price:</label>
    <input 
      type="text" 
      onChange={(e) => setPrice(e.target.value)} 
      value={Price} 
    />
     <label>Description:</label>
    <input 
      type="text" 
      onChange={(e) => setDescription(e.target.value)} 
      value={Description} 
    />
     <label>Seller:</label>
    <input 
      type="text" 
      onChange={(e) => setSeller(e.target.value)} 
      value={Seller} 
    />
     <label>Ratings:</label>
    <input 
      type="text" 
      onChange={(e) => setRatings(e.target.value)} 
      value={Ratings} 
    />
     <label>Reviews:</label>
    <input 
      type="text" 
      onChange={(e) => setReviews(e.target.value)} 
      value={Reviews} 
    />

<label>AvailableQuantity:</label>
    <input 
      type="text" 
      onChange={(e) => setAvailableQuantity(e.target.value)} 
      value={AvailableQuantity} 
    />

    <button>  Create Product</button>
    {error && <div className="error">{error}</div>}
  </form>
  )}
  </div>
)

}

export default ProductForm

  