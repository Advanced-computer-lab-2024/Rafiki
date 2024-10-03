import React, { useState } from 'react';

const TouristHomePage = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [showWallet, setShowWallet] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'John Doe',
        email: 'johndoe@example.com',
        mobile: '+123456789',
        nationality: 'American',
        dob: '1990-01-01',
    });

    const toggleProfile = () => {
        setShowProfile(!showProfile);
        setShowWallet(false); // Hide wallet when showing profile
    };

    const toggleWallet = () => {
        setShowWallet(!showWallet);
        setShowProfile(false); // Hide profile when showing wallet
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <header>
                <h1>Welcome to Your Tourist Dashboard</h1>
                <nav>
                    <button onClick={toggleProfile}>Show My Profile</button>
                    <button onClick={toggleWallet}>My Wallet</button>
                </nav>
            </header>

            {showProfile && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Your Profile</h2>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                required
                            />
                            <br />
                            <input
                                type="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                required
                            />
                            <br />
                            <input
                                type="tel"
                                name="mobile"
                                value={userData.mobile}
                                onChange={handleInputChange}
                                placeholder="Mobile Number"
                                required
                            />
                            <br />
                            <input
                                type="text"
                                name="nationality"
                                value={userData.nationality}
                                onChange={handleInputChange}
                                placeholder="Nationality"
                                required
                            />
                            <br />
                            <input
                                type="date"
                                name="dob"
                                value={userData.dob}
                                onChange={handleInputChange}
                                required
                            />
                            <br />
                            <button onClick={handleEditToggle}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Mobile Number:</strong> {userData.mobile}</p>
                            <p><strong>Nationality:</strong> {userData.nationality}</p>
                            <p><strong>Date of Birth:</strong> {userData.dob}</p>
                            <button onClick={handleEditToggle}>Update Profile</button>
                        </div>
                    )}
                </div>
            )}

            {showWallet && (
                <div style={{ marginTop: '20px' }}>
                    <h2>My Wallet</h2>
                    <p><strong>Current Balance:</strong> $100.00</p>
                    <p><strong>Transaction History:</strong></p>
                    <ul>
                        <li>Payment for Tour: $50.00</li>
                        <li>Payment for Guide: $30.00</li>
                        <li>Deposit: $100.00</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TouristHomePage;
