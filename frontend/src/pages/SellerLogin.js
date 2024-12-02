import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SellerLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      setError(null);
    
      try {
        const response = await axios.post('/api/sellerRoute/login', {
          Username: username,
          Password: password,
        });
    
        if (response.status === 200) {
          const { tourist } = response.data; // Assuming "tourist" holds seller data
          localStorage.setItem("sellerId", tourist._id); // Store seller ID in localStorage
          alert("Login successful");
          navigate('/seller-signup');
        }
      } catch (error) {
        setError(error.response?.data?.message || "Login failed. Please try again.");
      }
    };
    

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Seller Login</h1>
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg p-8 rounded space-y-4"
            >
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
}

export default SellerLogin;
