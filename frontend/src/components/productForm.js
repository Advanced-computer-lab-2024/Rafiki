import { useState, useEffect } from 'react';

const ProductForm = ({ existingProduct, onSubmit }) => {
  const [imageFile, setImageFile] = useState(null); // State for image file
  const [isVisible, setIsVisible] = useState(false);
  const [Name, setName] = useState('');
  const [Price, setPrice] = useState('');
  const [Description, setDescription] = useState('');
  const [Seller, setSeller] = useState('');
  const [Ratings, setRatings] = useState('');
  const [Reviews, setReviews] = useState('');
  const [AvailableQuantity, setAvailableQuantity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.Name || '');
      setPrice(existingProduct.Price || '');
      setDescription(existingProduct.Description || '');
      setSeller(existingProduct.Seller || '');
      setRatings(existingProduct.Ratings || '');
      setReviews(existingProduct.Reviews || '');
      setAvailableQuantity(existingProduct.AvailableQuantity || '');
    }
  }, [existingProduct]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', Name);
    if (imageFile) {
      formData.append('Picture', imageFile); 
    }
    formData.append('Price', Price);
    formData.append('Description', Description);
    formData.append('Seller', Seller);
    formData.append('Ratings', Ratings);
    formData.append('Reviews', Reviews);
    formData.append('AvailableQuantity', AvailableQuantity);

    const response = await fetch('api/productsRoute/addProduct', {
      method: existingProduct ? 'PUT' : 'POST', 
      body: formData, 
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setName('');
      setImageFile(null); 
      setPrice('');
      setDescription('');
      setSeller('');
      setRatings('');
      setReviews('');
      setAvailableQuantity('');

      console.log('Product updated:', json);
      if (onSubmit) onSubmit(); 
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {existingProduct ? 'Update Product' : 'Create Product'}
      </button>
      {isVisible && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>{existingProduct ? 'Update Product' : 'Create Product'}</h3>

          <label>Name:</label>
          <input 
            type="text" 
            onChange={(e) => setName(e.target.value)} 
            value={Name} 
          />
          
          <label>Picture:</label>
          <input 
            type="file" 
            onChange={(e) => setImageFile(e.target.files[0])} 
            accept="image/*" // Accept only image files
          />
          {existingProduct && existingProduct.Picture && (
            <div>
              <p>Current Image:</p>
              <img src={existingProduct.Picture} alt="Current" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          
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

          <label>Available Quantity:</label>
          <input 
            type="text" 
            onChange={(e) => setAvailableQuantity(e.target.value)} 
            value={AvailableQuantity} 
          />

          <button type="submit">{existingProduct ? 'Update Product' : 'Create Product'}</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default ProductForm;

