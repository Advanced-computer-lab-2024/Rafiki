import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';  // Assuming ProductDetails component is available

const ArchivedProducts = () => {
  const [archivedProducts, setArchivedProducts] = useState([]);

  useEffect(() => {
    const fetchArchivedProducts = async () => {
      const response = await fetch('/api/productsRoute/viewArchived');
      const data = await response.json();
      if (response.ok) {
        setArchivedProducts(data);
      } else {
        console.error('Error fetching archived products:', data);
      }
    };

    fetchArchivedProducts();
  }, []);

  const handleUnarchive = async (productId) => {
    const response = await fetch(`/api/productsRoute/archiveProduct/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isArchived: false }),
    });

    // const data = await response.json();
    if (response.ok) {
      alert('Product unarchived successfully!');
      setArchivedProducts(archivedProducts.filter(product => product._id !== productId));
    } else {
      alert('Error unarchiving product.');
    }
  };

  return (
    <div>
      <h2>Archived Products</h2>
      {archivedProducts.length > 0 ? (
        archivedProducts.map(product => (
          <div key={product._id}>
            <ProductDetails product={product} />
            <button onClick={() => handleUnarchive(product._id)}>Unarchive</button>
          </div>
        ))
      ) : (
        <p>No archived products found.</p>
      )}
    </div>
  );
};

export default ArchivedProducts;
