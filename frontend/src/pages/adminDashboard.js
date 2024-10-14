import AdminForm from '../components/adminForm';
import GovernerForm from '../components/governerForm';
import DeleteAdmin from '../components/DeleteAdmin';
import CategoryForm from '../components/categoryForm';
import { useEffect, useState } from "react";
import CategoryDetails from "../components/categoryDetails";
import ProductDetails from "../components/ProductDetails";
import AdminTagDetails from '../components/AdminTagDetails';
import AdminTagForm from '../components/AdminTagForm';
import ProductForm from '../components/productForm';
import ArchivedProducts from '../components/ArchivedProducts'; // Import ArchivedProducts component

const AdminSignup = () => {
  const [categories, setCategories] = useState([]); // Initialize categories
  const [isVisible, setIsVisible] = useState(false); // For toggling tags visibility
  const [isVisible2, setIsVisible2] = useState(false); // For toggling categories visibility
  const [isArchivedVisible, setIsArchivedVisible] = useState(false); // For toggling archived products visibility
  const [tag, setTag] = useState([]);
  const [products, setProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false); // For toggling product details visibility

  // Fetch categories
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

  // Update category
  const updateCategory = async (id, newName) => {
    const response = await fetch(`/api/categoryRoutes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();

    if (response.ok) {
      setCategories(categories.map(category =>
        category._id === id ? { ...category, name: newName } : category
      ));
    } else {
      console.error('Failed to update category:', json.error);
    }
  };

  // Delete category
  const deleteCategory = async (id) => {
    const response = await fetch(`/api/categoryRoutes/${id}`, { method: 'DELETE' });
    const json = await response.json();

    if (response.ok) {
      setCategories(categories.filter(category => category._id !== id));
    } else {
      console.error('Failed to delete category:', json.error);
    }
  };

  // Fetch tags
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

  // Update tag
  const updateTag = async (id, newName) => {
    const response = await fetch(`/api/TagRoute/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName }),
      headers: { 'Content-Type': 'application/json' },
    });

    const json = await response.json();

    if (response.ok) {
      setTag(tag.map(tag =>
        tag._id === id ? { ...tag, name: newName } : tag
      ));
    } else {
      console.error('Failed to update tag:', json.error);
    }
  };

  // Delete tag
  const deleteTag = async (id) => {
    const response = await fetch(`/api/TagRoute/${id}`, { method: 'DELETE' });
    const json = await response.json();

    if (response.ok) {
      setTag(tag.filter(tag => tag._id !== id));
    } else {
      console.error('Failed to delete tag:', json.error);
    }
  };

  // Fetch all products
  const fetchProducts = async () => {
    const response = await fetch('/api/productsRoute');
    const json = await response.json();
    if (response.ok) {
      setProducts(json);
    } else {
      console.error('Error fetching products:', json);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle visibility toggles
  const handleClick = () => setIsVisible(!isVisible);
  const handleClick2 = () => setIsVisible2(!isVisible2);
  const handleProductClick = () => setIsProductVisible(!isProductVisible);
  const handleArchivedClick = () => setIsArchivedVisible(!isArchivedVisible);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* Toggle Tags Visibility */}
      <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} Tags
      </button>
      {isVisible && (
        <div className="tag">
          {tag.length > 0 ? (
            tag.map(tags => (
              <AdminTagDetails
                Tag={tags}
                key={tags._id}
                onUpdate={updateTag}
                onDelete={deleteTag}
              />
            ))
          ) : (
            <p>No Tags found.</p>
          )}
        </div>
      )}
      <br />

      {/* Toggle Categories Visibility */}
      <button onClick={handleClick2}>
        {isVisible2 ? 'Hide' : 'Show'} Categories
      </button>
      {isVisible2 && (
        <div className="categories">
          {categories.length > 0 ? (
            categories.map(category => (
              <CategoryDetails
                category={category}
                key={category._id}
                onUpdate={updateCategory}
                onDelete={deleteCategory}
              />
            ))
          ) : (
            <p>No categories found.</p>
          )}
        </div>
      )}

      <br />

      {/* Toggle Product Details */}
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

      <br />

      {/* Toggle Archived Products */}
      <button onClick={handleArchivedClick}>
        {isArchivedVisible ? 'Hide' : 'Show'} Archived Products
      </button>
      {isArchivedVisible && <ArchivedProducts />}

      <br />
      {/* Admin Forms */}
      <AdminForm />
      <br />
      <GovernerForm />
      <br />
      <DeleteAdmin />
      <br />
      <CategoryForm />
      <br />
      <AdminTagForm />
      <br />
      <ProductForm />
    </div>
  );
};

export default AdminSignup;

// import AdminForm from '../components/adminForm';
// import GovernerForm from '../components/governerForm';
// import DeleteAdmin from '../components/DeleteAdmin';
// import CategoryForm from '../components/categoryForm';
// import { useEffect, useState } from "react";
// import CategoryDetails from "../components/categoryDetails";
// import ProductDetails from "../components/ProductDetails";
// import AdminTagDetails from '../components/AdminTagDetails';
// import AdminTagForm from '../components/AdminTagForm';
// import ProductForm from '../components/productForm';
// import ArchivedProducts from './ArchivedProducts';  // Import the ArchivedProducts component

// const AdminSignup = () => {
//     const [categories, setCategories] = useState([]); // Initialize as an empty array
//     const [isVisible, setIsVisible] = useState(false);
//     const [isVisible2, setIsVisible2] = useState(false);
//     const [tag, setTag] = useState([]);
//     const [products, setProducts] = useState([]);
//   const [isProductVisible, setIsProductVisible] = useState(false);
//     useEffect(() => {
//         const fetchCategories = async () => {
//             const response = await fetch('/api/categoryRoutes');
//             const json = await response.json();

//             if (response.ok) {
//                 setCategories(json);
//             }
//         };

//         fetchCategories();
//     }, []);

//     const updateCategory = async (id, newName) => {

//       console.log('Updating category with ID:', id, 'and new name:', newName); // Debug log

//       const response = await fetch(`/api/categoryRoutes/${id}`, {
//           method: 'PUT',
//           body: JSON.stringify({ name: newName }),
//           headers: { 'Content-Type': 'application/json' },
//       });
      
//       const json = await response.json();

//       console.log('Update response:', json); // Debug log

//       if (response.ok) {
//           setCategories(categories.map(category =>
//               category._id === id ? { ...category, name: newName } : category
//           ));
//       } else {
//           console.error('Failed to update category:', json.error);
//       }
//   };



//   const deleteCategory = async (id) => {
   
//     console.log('Attempting to delete category with ID:', id); // Debug log
   
//     const response = await fetch(`/api/categoryRoutes/${id}`, {
//         method: 'DELETE',
//     });

//     const json = await response.json();
//     console.log('Delete response:', json); // Debug log the response

//     if (response.ok) {
//         setCategories(categories.filter(category => category._id !== id));
//     } else {
//         const json = await response.json();
//         console.error('Failed to delete category:', json.error);
//     }
// };


// const updateTag = async (id, newName) => {

//   console.log('Updating tag with ID:', id, 'and new name:', newName); // Debug log

//   const response = await fetch(`/api/TagRoute/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({ name: newName }),
//       headers: { 'Content-Type': 'application/json' },
//   });

  
//   const json = await response.json();

//   console.log('Update response:', json); // Debug log

//   if (response.ok) {
//       setTag(tag.map(tag =>
//           tag._id === id ? { ...tag, name: newName } : tag
//       ));
//   } else {
//       console.error('Failed to update tag:', json.error);
//   }
// };

// const deleteTag = async (id) => {
   
//   console.log('Attempting to delete tag. with ID:', id); // Debug log
 
//   const response = await fetch(`/api/TagRoute/${id}`, {
//       method: 'DELETE',
//   });

//   const json = await response.json();
//   console.log('Delete response:', json); // Debug log the response

//   if (response.ok) {
//       setTag(tag.filter(tag => tag._id !== id));
//   } else {
//       const json = await response.json();
//       console.error('Failed to delete tag:', json.error);
//   }
// };







//     const handleClick = () => {
//         setIsVisible(!isVisible);
//     };

//     useEffect(() => {
//       const fetchTag = async () => {
//           const response = await fetch('/api/TagRoute');
//           const json = await response.json();

//           if (response.ok) {
//               setTag(json);
//           }
//       };

//       fetchTag();
//   }, []);
//   const fetchProducts = async () => {
//     const response = await fetch('/api/productsRoute'); // Adjust the endpoint as necessary
//     const json = await response.json();
//     if (response.ok) {
//       setProducts(json); // Set the state with the fetched products
//     } else {
//       console.error('Error fetching products:', json); // Log errors
//     }
//   };
 

//   useEffect(() => {
    
//     fetchProducts(); 
//   }, []);
//   const handleClick2 = () => {
//     setIsVisible2(!isVisible2);
// };

// const handleProductClick = () => {
//   setIsProductVisible(!isProductVisible);
// };

//     return (
      
//         <div>
//           <h2>Admin Dashboard</h2>
//             <button onClick={handleClick}>
//                 {isVisible ? 'Hide' : 'Show'} Tags
//             </button>
//             {isVisible && (
//                 <div className="tag">
//                     {tag.length > 0 ? (
//                         tag.map(tags => (
//                             <AdminTagDetails 
//                             Tag={tags}
//                              key={tags._id} 
//                             onUpdate={updateTag} 
//                             onDelete={deleteTag} /> // Use category prop /> // Use category prop
                            
                            
//                         ))
//                     ) : (
//                         <p>No Tags found.</p>
//                     )}
//                 </div>
//             )}
//             <br/>

// <button onClick={handleClick2}>
//                 {isVisible2 ? 'Hide' : 'Show'} Catogries
//             </button>
//             {isVisible2 && (
//                 <div className="categories">
//                     {categories.length > 0 ? (
//                         categories.map(category => (
//                             <CategoryDetails category={category} key={category._id} 
                            
//                             keyy={category._id} 
//                             categoryy={category} 
//                             onUpdate={updateCategory} 
//                             onDelete={deleteCategory} /> // Use category prop
//                         ))
//                     ) : (
//                         <p>No categories found.</p>
//                     )}
//                 </div>
//             )}

// <button onClick={handleProductClick}>
//         {isProductVisible ? 'Hide' : 'Show'} Product Details
//       </button>
//       {isProductVisible && (
//         <div className="products">
//           {products.length > 0 ? (
//             products.map(product => (
//               <ProductDetails product={product} key={product._id} />
//             ))
//           ) : (
//             <p>No products found.</p>
//           )}
//         </div>
//       )}
//             <AdminForm />
//             <br />
//             <GovernerForm />
//             <br />
//             <DeleteAdmin />
//             <br />
//             <CategoryForm />
//             <br/>
//             <AdminTagForm/>
//             <br/>
//             <ProductForm/>
//         </div>
//     );
// };

// export default AdminSignup;
