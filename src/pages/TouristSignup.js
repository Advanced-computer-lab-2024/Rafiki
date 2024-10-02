import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TouristSignup = () => {
    const Navigate = useNavigate();
    const handleClick =()=>{
      Navigate('/tourist-homepage');
    }
    const [isStudent, setIsStudent] = useState(false);

    const handleStudentChange = (event) => {
        setIsStudent(event.target.value === 'no');
    };
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Tourist Signup</h1>
            <p>Fill out the form below to register as a tourist.</p>
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
                    <label>Mobile Number:</label>
                    <input type="tel" placeholder="Enter your mobile number" required />
                </div>
                <br />
                <div>
                    <label>Nationality:</label>
                    <input type="text" placeholder="Enter your nationality" required />
                </div>
                <br />
                <div>
                    <label>Date of Birth:</label>
                    <input type="date" required />
                </div>
                <br />
                <div>
                    <label>Are you a student?</label>
                    <select onChange={handleStudentChange} required>
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <br />
                {isStudent && (
                    <div>
                        <label>Job:</label>
                        <input type="text" placeholder="Enter your job title" required />
                    </div>
                )}
                <br />
                <br />
                <button onClick={handleClick}>Sign Up</button>
            </form>
        </div>
    );
};

export default TouristSignup;
