import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TourGuideLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('/api/tourguideRoute/login', {
                Username: username,
                Password: password,
            });
            setActivities(response.data.activities); // Store activities for the logged-in tour guide


            if (response.status === 200) {
                const { termsAccepted } = response.data;
            
                // Save the username in localStorage
                localStorage.setItem("username", username);
                localStorage.setItem('activities', JSON.stringify(activities));

            
                alert("Login successful");
                if (!termsAccepted) {
                    alert("Please accept the terms and conditions in the dashboard.");
                }
            
                navigate('/tourguide-signup'); // Redirect to dashboard
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Tour Guide Login</h1>
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

export default TourGuideLogin;
