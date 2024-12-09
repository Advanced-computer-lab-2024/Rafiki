import axios from 'axios';
import UploadedDocuments from '../components/UploadedDocuments';
import AdminForm from '../components/adminForm';
import GovernerForm from '../components/governerForm';
import DeleteAdmin from '../components/DeleteAdmin';
import CategoryForm from '../components/categoryForm';
import { useEffect, useState } from "react";
import CategoryDetails from "../components/categoryDetails";
import ProductdetailsForAdmin from "../components/productdetailsForAdmin";
import AdminTagDetails from '../components/AdminTagDetails';
import AdminTagForm from '../components/AdminTagForm';
import ProductForm from '../components/productForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import ArchivedProducts from '../components/ArchivedProducts'; // Import ArchivedProducts component
import ComplaintDetails from '../components/complaintDetails';
import CreatePromoCodes from '../components/promoCodeCreateForm'
import { useFlaggedActivities } from '../FlaggedActivitiesContext';
import { useLocation } from 'react-router-dom';
import pic from '../pics/pic3.jpg'
import ItineraryDetails from "../components/itineraryDetailsAdmin";
import ActivityDetails from "../components/ActivityDetailsAdmin";


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

  const [itineraries, setItineraries] = useState(null);
  const [activity, setActivity] = useState(null);

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

  //const location = useLocation();
  //const outOfStockProducts = location.state?.outOfStockProducts || [];
    //         if (response.ok) {
    //             setCategories(json);
    //         }
    //     };

    //     fetchCategories();
    // }, []);

   
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

    const fetchItineraries = async () => {
      const response = await fetch("/api/itineraryRoute");
      const json = await response.json();
      if (response.ok) setItineraries(json);
    };
  
    useEffect(() => {
      const fetchActivities = async () => {
        const response = await fetch("/api/ActivityRoute");
        const json = await response.json();
        if (response.ok) setActivity(json);
      };
      fetchActivities();
    }, []);

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
      fetchItineraries();
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

    //   const response = await fetch(/api/categoryRoutes/${id}, {
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
  const [activeMenu, setActiveMenu] = useState(null); // Tracks the currently active menu item
  
  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu); // Toggle current menu or close if already open
  };
  const [sellerUsername, setSellerUsername] = useState('');
  useEffect(() => {
    const username = localStorage.getItem("loggedinUsername");
    console.log("Retrieved username from localStorage:", username); // Debugging
    if (username) {
      setSellerUsername(username);
    } else {
      console.error("adminUsername not found in localStorage.");
      setSellerUsername("Guest"); // Default fallback
    }
  }, []);


  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${pic})`,// Replace with your actual background image URL
      }}
    >
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-900 text-white p-6">
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
          {sellerUsername.charAt(0).toUpperCase()}{/* Replace with admin initials */}
          </div>
          <span className="ml-4 text-lg font-semibold">Hi, {sellerUsername}</span>
        </div>
  
        {/* Sidebar Menu */}
        <ul className="space-y-6">
          <li>
            <button
              onClick={() => setActiveMenu('tags')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'tags' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 2L5 5H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-1l-1-3H6zm0 2h12l.6 2H5.4l.6-2zM4 7h16v11H4V7zm8 2c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z" />
              </svg>
              Manage Tags
            </button>
          </li>

          <li>
  <button
    onClick={() => setActiveMenu('CreatePromoCodes')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'CreatePromoCodes' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    Create PromoCodes
  </button>
</li>







          
          <li>
  <button
    onClick={() => setActiveMenu('governerForm')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'governerForm' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    Governer Form
  </button>
</li>
<li>
  <button
    onClick={() => setActiveMenu('deleteAdmin')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'deleteAdmin' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M9 3V4H4V6H20V4H15V3H9ZM4 8H20V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12Z" />
    </svg>
    Delete Admin
  </button>
</li>

          <li>
  <button
    onClick={() => setActiveMenu('adminForm')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'adminForm' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    Admin Form
  </button>
</li>

<li>
  <button
    onClick={() => setActiveMenu('catogeryForm')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'catogeryForm' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    Create Catogery
  </button>
</li>


<button
    onClick={() => setActiveMenu('ProductForm')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'ProductForm' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    create Product
  </button>



  <button
    onClick={() => setActiveMenu('AdminTagForm')}
    className={`w-full text-left flex items-center px-4 py-2 rounded ${
      activeMenu === 'AdminTagForm' ? 'bg-blue-700 text-white' : 'text-blue-400 hover:text-white'
    }`}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 mr-2"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
    </svg>
    Create Tag
  </button>




          <li>
            <button
              onClick={() => setActiveMenu('categories')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'categories'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 2v2h14V2H5zm14 4H5l-1 14h16l-1-14zM8 8h2v9H8V8zm6 0h2v9h-2V8z" />
              </svg>
              Manage Categories
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('products')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'products'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
              </svg>
              Product Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('itineraries')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'itineraries'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
              </svg>
              Itineraries Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('activities')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'activities'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a2 2 0 00-2 2v1H5v2h14V5h-5V4a2 2 0 00-2-2zM4 10v10h16V10H4zm2 2h4v6H6v-6zm6 0h4v6h-4v-6z" />
              </svg>
              Activities Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('archived')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'archived'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M5 4h14v2H5V4zm0 4h14v2H5V8zm0 4h14v2H5v-2z" />
              </svg>
              Archived Products
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('documents')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'documents'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13 2h7v7h-2V5.414l-9.586 9.586-1.414-1.414L16.586 4H13V2zm-9 9H2v11h17v-2H4v-9z" />
              </svg>
              Uploaded Documents
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveMenu('complaints')}
              className={`w-full text-left flex items-center px-4 py-2 rounded ${
                activeMenu === 'complaints'
                  ? 'bg-blue-700 text-white'
                  : 'text-blue-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2a10 10 0 00-3 19.5V22h6v-.5a10 10 0 00-3-19.5zm0 2a8 8 0 014.33 14.4l-.33.26V20h-8v-1.34l-.33-.26A8 8 0 0112 4z" />
              </svg>
              Complaints
            </button>
          </li>
        </ul>
      </div>
  
      {/* Main Content */}
      
      <div className="w-3/4 p-6 relative">

      {activeMenu === 'CreatePromoCodes' && (
  <div
    className="admin-form p-4 rounded shadow-md"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Frosted glass effect
    }}
  >
    <CreatePromoCodes />
  </div>
)}




      {activeMenu === 'ProductForm' && (
  <div
    className="admin-form p-4 rounded shadow-md"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Frosted glass effect
    }}
  >
    <ProductForm />
  </div>
)}



{activeMenu === 'AdminTagForm' && (
  <div
    className="admin-form p-4 rounded shadow-md"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Frosted glass effect
    }}
  >
    <AdminTagForm />
  </div>
)}


      {activeMenu === 'adminForm' && (
  <div
    className="admin-form p-4 rounded shadow-md"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Frosted glass effect
    }}
  >
    <AdminForm />
  </div>
)}

{activeMenu === 'catogeryForm' && (
  <div
    className="admin-form p-4 rounded shadow-md"
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white
      backdropFilter: 'blur(10px)', // Frosted glass effect
    }}
  >
    <CategoryForm />
  </div>
)}



{activeMenu === 'governerForm' && (
  <div
    className="governer-form mx-auto"
    style={{
      backgroundColor: 'transparent',
      backdropFilter: 'blur(8px)',
      width: 'auto',
      height: 'auto',
      marginTop: '2rem',
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: activeMenu === 'governerForm' ? 1 : 0,
      transform: activeMenu === 'governerForm' ? 'scale(1)' : 'scale(0.9)',
    }}
  >
    <GovernerForm />
  </div>
)}

{activeMenu === 'deleteAdmin' && (
  <div
    className="delete-admin flex items-center justify-center min-h-screen"
    style={{
      backgroundColor: 'transparent', // Transparent so the underlying design can show through
      backdropFilter: 'blur(10px)',    // Frosted glass effect
      transition: 'opacity 0.3s ease, transform 0.3s ease',
      opacity: activeMenu === 'deleteAdmin' ? 1 : 0,
      transform: activeMenu === 'deleteAdmin' ? 'scale(1)' : 'scale(0.9)',
    }}
  >
    <DeleteAdmin />
  </div>
)}


        {activeMenu === 'tags' && <div className="tags">{<div className="tag">
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


          </div>/* Tags content here */}</div>}
        {activeMenu === 'categories' && (
          <div className="categories">{
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
          </div>/* Categories content here */}</div>
        )}
        {activeMenu === 'products' && (
          <div className="products">{
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductdetailsForAdmin product={product} key={product._id} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>/* Product Details content here */}</div>
        )}


                {/* Itineraries Section */}
                {activeMenu === "itineraries" && (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
      Itineraries
    </h3>
    {/* Show Itineraries */}
    {itineraries ? (
      <>
        {itineraries.map((itinerary) => (
          <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
        ))}
      </>
    ) : (
      <p className="text-gray-500">No itineraries available.</p>
    )}
  </div>
)}
  
        {activeMenu === "activities" && (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Activities</h3>
            {/* List of Activities */}
            {activity &&
              activity.map((act) => (
                <div
                  key={act._id}
                  className="border rounded p-4 mb-4 shadow-md bg-white max-w-2xl w-full"
                >
                  <ActivityDetails activity={act} />
                  <div className="mt-2 flex items-center justify-start space-x-4"></div>
                </div>
              ))}
          </div>
        )}


        {activeMenu === 'archived' && (
          <div className="archived">{
            <ArchivedProducts />/* Archived Products content here */}</div>
        )}
       {activeMenu === 'documents' && (
  <UploadedDocuments
    handleFileChange={handleFileChange}
    handleUpload={handleUpload}
    isUploading={isUploading}
    uploadedDocuments={uploadedDocuments}
    handleDocumentAction={handleDocumentAction}
    show={show}
    uploadError={uploadError}
    selectedFile={selectedFile}
  />
)}


        {activeMenu === 'complaints' && (
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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