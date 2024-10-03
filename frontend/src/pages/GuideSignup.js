import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const GuideSignup = () => {
    const Navigate = useNavigate();
    const handleRedirect = () => {
        switch (role) {
            case 'tour_guide':
                Navigate('/guide-homepage') 
                break;
            case 'advertiser':
                Navigate('/adv-homepage') ;
                break;
            case 'seller':
                window.location.href = 'https://www.website3.com'; 
                break;
            default:
                alert('Please select a role before proceeding.');
                break;
        }
    };
   
     const [role, setRole] = useState('');
    const [advertiserFields, setAdvertiserFields] = useState(false);
    const [sellerFields, setSellerFields] = useState(false);
    const [tourGuideFields, setTourGuideFields] = useState(false);

    const handleRoleChange = (event) => {
        const selectedRole = event.target.value;
        setRole(selectedRole);
        setAdvertiserFields(selectedRole === 'advertiser');
        setSellerFields(selectedRole === 'seller');
        setTourGuideFields(selectedRole === 'tour_guide');
    };

    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Guide Signup</h1>
            <p>Fill out the form below to register as a guide.</p>
            <form>
            <div>
                    <label>Email:</label>
                    <input type="email" placeholder="Enter your email" required />
                </div>
                <br />
                <div>
                    <label>Username:</label>
                    <input type="text" placeholder="Choose a username" required />
                </div>
                <br />
                <div>
                    <label>Password:</label>
                    <input type="password" placeholder="Create a password" required />
                </div>
                <br />

                <div>
                    <label>Are you a...?</label>
                    <select onChange={handleRoleChange} required>
                        <option value="">Select</option>
                        <option value="tour_guide">Tour Guide</option>
                        <option value="advertiser">Advertiser</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <br />

                {advertiserFields && (
                    <>
                        <div>
                            <label>Company Profile:</label>
                            <input type="text" placeholder="Enter company profile" required />
                        </div>
                        <br />
                        <div>
                            <label>Company's Website Link:</label>
                            <input type="url" placeholder="Enter website link" required />
                        </div>
                        <br />
                        <div>
                            <label>Hotline:</label>
                            <input type="tel" placeholder="Enter hotline number" required />
                        </div>
                        <br />
                    </>
                )}

                {sellerFields && (
                    <>
                        <div>
                            <label>Description:</label>
                            <textarea placeholder="Enter description" required></textarea>
                        </div>
                        <br />
                    </>
                )}

                {tourGuideFields && (
                    <>
                        <div>
                            <label>Years of Experience:</label>
                            <input type="number" placeholder="Enter years of experience" required />
                        </div>
                        <br />
                        <div>
                            <label>Previous Work (if available):</label>
                            <input type="text" placeholder="Enter previous work" />
                        </div>
                        <br />
                    </>
                )}

                


                <button onClick={handleRedirect}>Sign Up</button>
            </form>
        </div>
    );
};

export default GuideSignup;

