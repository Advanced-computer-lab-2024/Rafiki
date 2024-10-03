import React, { useState } from 'react';

const GuideHomePage = () => {
    const [showProfile, setShowProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        email: 'johndoe@example.com',
        username: 'JohnDoe',
        role: 'Tour Guide',
        yearsOfExperience: 5,
        previousWork: 'Travel Agency XYZ',
        companyProfile: '',
        websiteLink: '',
        hotline: '',
        description: '',
    });

    const toggleProfile = () => {
        setShowProfile(!showProfile);
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
                <h1>Welcome to Your Guide Dashboard</h1>
                <nav>
                    <button onClick={toggleProfile}>Show My Profile</button>
                </nav>
            </header>

            {showProfile && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Your Profile</h2>
                    {isEditing ? (
                        <div>
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
                                type="text"
                                name="username"
                                value={userData.username}
                                onChange={handleInputChange}
                                placeholder="Username"
                                required
                            />
                            <br />
                            <select
                                name="role"
                                value={userData.role}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Tour Guide">Tour Guide</option>
                                <option value="Advertiser">Advertiser</option>
                                <option value="Seller">Seller</option>
                            </select>
                            <br />
                            {userData.role === 'Advertiser' && (
                                <>
                                    <input
                                        type="text"
                                        name="companyProfile"
                                        value={userData.companyProfile}
                                        onChange={handleInputChange}
                                        placeholder="Company Profile"
                                        required
                                    />
                                    <br />
                                    <input
                                        type="url"
                                        name="websiteLink"
                                        value={userData.websiteLink}
                                        onChange={handleInputChange}
                                        placeholder="Website Link"
                                        required
                                    />
                                    <br />
                                    <input
                                        type="tel"
                                        name="hotline"
                                        value={userData.hotline}
                                        onChange={handleInputChange}
                                        placeholder="Hotline"
                                        required
                                    />
                                    <br />
                                </>
                            )}
                            {userData.role === 'Seller' && (
                                <>
                                    <textarea
                                        name="description"
                                        value={userData.description}
                                        onChange={handleInputChange}
                                        placeholder="Description"
                                        required
                                    ></textarea>
                                    <br />
                                </>
                            )}
                            {userData.role === 'Tour Guide' && (
                                <>
                                    <input
                                        type="number"
                                        name="yearsOfExperience"
                                        value={userData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        placeholder="Years of Experience"
                                        required
                                    />
                                    <br />
                                    <input
                                        type="text"
                                        name="previousWork"
                                        value={userData.previousWork}
                                        onChange={handleInputChange}
                                        placeholder="Previous Work"
                                    />
                                    <br />
                                </>
                            )}
                            <button onClick={handleEditToggle}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Role:</strong> {userData.role}</p>
                            {userData.role === 'Advertiser' && (
                                <>
                                    <p><strong>Company Profile:</strong> {userData.companyProfile}</p>
                                    <p><strong>Website Link:</strong> {userData.websiteLink}</p>
                                    <p><strong>Hotline:</strong> {userData.hotline}</p>
                                </>
                            )}
                            {userData.role === 'Seller' && (
                                <p><strong>Description:</strong> {userData.description}</p>
                            )}
                            {userData.role === 'Tour Guide' && (
                                <>
                                    <p><strong>Years of Experience:</strong> {userData.yearsOfExperience}</p>
                                    <p><strong>Previous Work:</strong> {userData.previousWork}</p>
                                </>
                            )}
                            <button onClick={handleEditToggle}>Update Profile</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GuideHomePage;
