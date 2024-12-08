import axios from 'axios';
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
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts'; // Import ArchivedProducts component
import ComplaintDetails from '../components/complaintDetails';
import CreatePromoCodes from '../components/promoCodeCreateForm'
import { useFlaggedActivities } from '../FlaggedActivitiesContext';
import { useLocation } from 'react-router-dom';

const AdminSignup = () => {
  const [categories, setCategories] = useState([]); // Initialize categories
  const [isVisible, setIsVisible] = useState(false); // For toggling tags visibility
  const [isVisible2, setIsVisible2] = useState(false); // For toggling categories visibility
  const [isArchivedVisible, setIsArchivedVisible] = useState(false); // For toggling archived products visibility
  const [tag, setTag] = useState([]);
  const [products, setProducts] = useState([]);
  const [isProductVisible, setIsProductVisible] = useState(false); // For toggling product details visibility
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isDocumentsVisible, setIsDocumentsVisible] = useState(false);
  const [totalUsers, setTotalUsers] = useState(null);
  const [newUsersThisMonth, setNewUsersThisMonth] = useState(null);  
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]);
  const { flagActivity } = useFlaggedActivities(); // State to store flagged activity IDs
  const [isVisibleActivities, setIsVisibleActivities] = useState(false);

  const [complaints, setComplaints] = useState(null); 
  const [isVisibleComplaints, setIsVisibleComplaints] = useState(false);
  const [isVisibleStatusSearch, setIsVisibleStatusSearch] = useState(false);
  const [isVisibleDateSort, setIsVisibleDateSort] = useState(false);
  const [status, setStatus] = useState('');
  const [outOfStockProducts, setOutOfStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };
  
    // Handle file upload
    const handleUpload = async () => {
      if (!selectedFile) {
        setUploadError('Please select a file to upload.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', selectedFile);
  
      try {
        setIsUploading(true);
        setUploadError(null);
  
        // Make API call to upload the file
        const response = await axios.post('/api/uploadDocument', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        if (response.status === 200) {
          alert('File uploaded successfully!');
        }
      } catch (err) {
        console.error('Error uploading file:', err);
        setUploadError('Failed to upload file.');
      } finally {
        setIsUploading(false);
      }
    };
  


    const fetchOutOfStockProducts = async () => {
      try {
        setLoading(true); // Start loading state
        const response = await axios.get('/api/productsRoute/check-stock'); // Replace with your backend URL
        const products = response.data.products;
        setOutOfStockProducts(products);
        if (products.length > 0 && !notificationShown) {
          setShowNotification(true); // Show notification
          setNotificationShown(true); // Prevent further pop-ups in this session
        }
        setError(null); // Clear previous errors
      } catch (err) {
        console.error('Error fetching out-of-stock products:', err);
        setError('Failed to fetch out-of-stock products.');
      } finally {
        setLoading(false); // Stop loading state
      }
    };
  
    useEffect(() => {
      fetchOutOfStockProducts();
    }, []);
  
    // Close the pop-up
    const handleCloseNotification = () => {
      setShowNotification(false);
    };
  

    const AdminChangePassword = () => (
        <ChangePasswordForm apiEndpoint="/api/adminRoute/changePassword" />
    );

    // const updateCategory = async (id, newName) => {

    //   console.log('Updating category with ID:', id, 'and new name:', newName); // Debug log

    //   const response = await fetch(`/api/categoryRoutes/${id}`, {
    //       method: 'PUT',
    //       body: JSON.stringify({ name: newName }),
    //       headers: { 'Content-Type': 'application/json' },
    //   });
    useEffect(() => {
      const fetchComplaints = async () => {
          const response = await fetch('/api/complaintRoute');
          const json = await response.json();
          if (response.ok) {
            setComplaints(json);
          }
      };
      fetchComplaints();
  }, []);

  const complaintStatusFilter = async () => {
    const response = await fetch(`/api/complaintRoute/search/${status}`);
    const json = await response.json();
    if (response.ok) {
      setComplaints(json);
    }
  };
  const complaintSortbyDtae = async () => {
    const response = await fetch('/api/complaintRoute/sort/date');
    const json = await response.json();
    if (response.ok) {
      setComplaints(json);
    }
  };

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



  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/uploadedDocuments');
        const json = await response.json();
        console.log("Fetched documents:", json); // Log the fetched documents
        
        if (response.ok) {
          setUploadedDocuments(json);
        } else {
          console.error("Error fetching documents:", json);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, []);
  

  const show=(pdf)=>{
    window.open(`http://localhost:4000/uploads/${pdf}` , "_blank","noreferrer")
  }

  
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

  const acceptDocument = async (id) => {
    alert('User has been accepted.');
    //setUploadedDocuments(uploadedDocuments.filter(doc => doc._id !== id));
  };

  // Function to reject a document
  const rejectDocument = async (id) => {
    alert('User has been rejected.');
    //setUploadedDocuments(uploadedDocuments.filter(doc => doc._id !== id))
  };

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await fetch('/api/ActivityRoute');
      const json = await response.json();
      if (response.ok) {
        setActivities(json);
      }
    };
    fetchActivities();
  }, []);

  

  const handleDocumentAction = async (name, action) => {
    try {
      const response = await axios.post('/api/accept-reject', { name, action });
      console.log(response.data.message);
  
      // Update documents in state after action
      setUploadedDocuments((prevDocuments) =>
        prevDocuments.filter((doc) => doc.originalname !== name)
      );
    } catch (error) {
      console.error(`Error ${action}ing document:`, error.response?.data || error.message);
    }
  };

  useEffect(() => {
    // Function to fetch total number of users
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('/api/adminRoute/total-users');
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (err) {
        setError('Error fetching total users.');
      }
    };

    // Function to fetch new users this month
    const fetchNewUsersThisMonth = async () => {
      try {
        const response = await fetch('/api/adminRoute/new-users-this-month');
        const data = await response.json();
        setNewUsersThisMonth(data.newUsers);
      } catch (err) {
        setError('Error fetching new users for this month.');
      }
    };

    // Call the functions to fetch data
    fetchTotalUsers();
    fetchNewUsersThisMonth();
  }, []);
  
  


  // Handle visibility toggles
  const handleClick = () => setIsVisible(!isVisible);
  const handleClick2 = () => setIsVisible2(!isVisible2);
  const handleProductClick = () => setIsProductVisible(!isProductVisible);
  const handleArchivedClick = () => setIsArchivedVisible(!isArchivedVisible);
  const handleDocumentsClick = () => setIsDocumentsVisible(!isDocumentsVisible);
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/path-to-background-image.jpg')`, // Replace with your actual background image URL
      }}
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
            A {/* Replace with admin initials */}
          </div>
          <span className="ml-4 text-lg font-semibold">Hi, Admin</span>
        </div>
  
        {/* Sidebar Menu */}
        <ul className="space-y-6">
          <li>
            <button
              onClick={handleClick}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isVisible ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Manage Tags
            </button>
          </li>
          <li>
            <button
              onClick={handleClick2}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isVisible2 ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Manage Categories
            </button>
          </li>
          <li>
            <button
              onClick={handleProductClick}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isProductVisible ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Product Details
            </button>
          </li>
          <li>
            <button
              onClick={handleArchivedClick}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isArchivedVisible ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Archived Products
            </button>
          </li>
          <li>
            <button
              onClick={handleDocumentsClick}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isDocumentsVisible ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Uploaded Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => setIsVisibleComplaints(!isVisibleComplaints)}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                isVisibleComplaints ? "bg-blue-700 text-white" : "text-blue-400 hover:text-white"
              }`}
            >
              Complaints
            </button>
          </li>
        </ul>
      </div>
  
      {/* Main Content */}
      <div className="w-3/4 p-6 relative">
        {/* Notification Section */}
        {showNotification && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-96 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                onClick={handleCloseNotification}
              >
                &times;
              </button>
              <h2 className="text-xl font-bold text-red-700">Out of Stock Products</h2>
              <ul className="mt-4 space-y-2">
                {outOfStockProducts.map((product) => (
                  <li key={product._id} className="text-gray-700">
                    {product.Name} is out of stock!
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
  
        {/* User Data */}
        {totalUsers !== null && newUsersThisMonth !== null ? (
          <div className="text-right mb-6">
            <p>Total Users: {totalUsers}</p>
            <p>New Users This Month: {newUsersThisMonth}</p>
          </div>
        ) : (
          <p className="text-right mb-6">Loading user data...</p>
        )}
  
        {/* Visibility Toggles and Content */}
        {isVisible && (
          <div className="tag">
            {tag.length > 0 ? (
              tag.map((tags) => (
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
  
        {isVisible2 && (
          <div className="categories">
            {categories.length > 0 ? (
              categories.map((category) => (
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
  
        {isProductVisible && (
          <div className="products">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductDetails product={product} key={product._id} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        )}
  
        {isArchivedVisible && <ArchivedProducts />}
  
        {isDocumentsVisible && (
          <div className="documents">
            <h2 className="text-xl font-bold mb-4">Uploaded Documents</h2>
            <input type="file" accept=".pdf" onChange={handleFileChange} />
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isUploading ? "Uploading..." : "Upload PDF"}
            </button>
            {uploadedDocuments.length > 0 ? (
              uploadedDocuments.map((document) => (
                <div key={document._id}>
                  <p>{document.originalname}</p>
                  <button onClick={() => show(document.filename)}>View PDF</button>
                  <button
                    onClick={() => handleDocumentAction(document.originalname, "accept")}
                    className="text-green-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDocumentAction(document.originalname, "reject")}
                    className="text-red-500"
                  >
                    Reject
                  </button>
                </div>
              ))
            ) : (
              <p>No documents uploaded yet.</p>
            )}
          </div>
        )}
  
        {isVisibleComplaints && (
          <div className="complaints">
            {complaints.map((complaint) => (
              <ComplaintDetails complaint={complaint} key={complaint._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
};



export default AdminSignup;
