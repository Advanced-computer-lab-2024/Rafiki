import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TouristLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [promoCode, setPromoCode] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setPromoCode(null);

        try {
            const response = await axios.post('/api/touristRoute/login', {
                Username: username,
                Password: password,
            });

            if (response.status === 200) {
                alert("Login successful");
                navigate('/tourist-signup', { state: { promoCode: response.data.promoCode } }); // Redirect to dashboard
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Tourist Login</h1>
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
            {/* Display promo code if available */}
            {promoCode && (
                <div className="mt-6 bg-green-100 p-4 rounded shadow-lg">
                    <h3 className="text-lg font-bold text-green-700">🎉 Happy Birthday!</h3>
                    <p className="text-green-700">Here's your special promo code:</p>
                    <p className="text-green-900 font-bold text-xl">{promoCode.code}</p>
                    <p className="text-green-700">Enjoy a {promoCode.discount}% discount!</p>
                </div>
            )}
        </div>
    );
}

export default TouristLogin;
