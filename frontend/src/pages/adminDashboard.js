import AdminForm from '../components/adminForm';
import GovernerForm from '../components/governerForm';
import DeleteAdmin from '../components/DeleteAdmin';
import CategoryForm from '../components/categoryForm';
import { useEffect, useState } from "react";
import CategoryDetails from "../components/categoryDetails";
import TagDetails from '../components/TagDetails';
import TagForm from '../components/TagForm';
import ProductDetails from "../components/ProductDetails";

const AdminSignup = () => {
    const [categories, setCategories] = useState([]); // Initialize as an empty array
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [tag, setTag] = useState([]);
    const [products, setProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false);
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categoryRoutes');
            const json = await response.json();

            if (response.ok) {
                setCategories(json);
            }
        };

        fetchCategories();
    }, []);

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    useEffect(() => {
      const fetchTag = async () => {
          const response = await fetch('/api/TagRoute');
          const json = await response.json();

          if (response.ok) {
              setTag(json);
          }
      };

      fetchTag();
  }, []);
  const fetchProducts = async () => {
    const response = await fetch('/api/productsRoute'); // Adjust the endpoint as necessary
    const json = await response.json();
    if (response.ok) {
      setProducts(json); // Set the state with the fetched products
    } else {
      console.error('Error fetching products:', json); // Log errors
    }
  };
 

  useEffect(() => {
    
    fetchProducts(); 
  }, []);
  const handleClick2 = () => {
    setIsVisible2(!isVisible2);
};

const handleProductClick = () => {
  setIsProductVisible(!isProductVisible);
};

    return (
      
        <div>
          <h2>Admin Dashboard</h2>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Tags
            </button>
            {isVisible && (
                <div className="categories">
                    {tag.length > 0 ? (
                        tag.map(tags => (
                            <TagDetails Tag={tags} key={tags._id} /> // Use category prop
                        ))
                    ) : (
                        <p>No Tags found.</p>
                    )}
                </div>
            )}
            <br/>

<button onClick={handleClick2}>
                {isVisible2 ? 'Hide' : 'Show'} Catogries
            </button>
            {isVisible2 && (
                <div className="categories">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <CategoryDetails category={category} key={category._id} /> // Use category prop
                        ))
                    ) : (
                        <p>No categories found.</p>
                    )}
                </div>
            )}

<button onClick={handleProductClick}>
        {isProductVisible ? 'Hide' : 'Show'} Product Details
      </button>
      {isProductVisible && (
        <div className="products">
          {products.length > 0 ? (
            products.map(product => (
              <ProductDetails product={product} key={product._id} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
            <AdminForm />
            <br />
            <GovernerForm />
            <br />
            <DeleteAdmin />
            <br />
            <CategoryForm />
            <br/>
            <TagForm/>
        </div>
    );
};

export default AdminSignup;
