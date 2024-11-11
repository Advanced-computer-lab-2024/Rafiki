import { useState } from 'react';

const AdvertiserForm = () => {
  // Form visibility
  const [isVisible, setIsVisible] = useState(false);
  
  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [nationality, setNationality] = useState('');
  const [dob, setDOB] = useState('');
  const [job, setJob] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  
  // Feedback messages
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [advertiserId, setAdvertiserId] = useState(null); // Store advertiser ID for deletion
  
  // Toggle form visibility
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  // Handle form submission for account creation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isTermsAccepted) {
      setError("You must accept the terms and conditions.");
      return;
    }

    // Prepare form data for submission
    const formData = new FormData();
    formData.append('Username', username);
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('MobileNumber', mobileNumber);
    formData.append('Nationalty', nationality);
    formData.append('DOB', dob);
    formData.append('Job', job);
    if (profilePicture) {
      formData.append('profilePicture', profilePicture);
    }

    try {
      const response = await fetch('/api/AdvertiserRoute', {
        method: 'POST',
        body: formData,
      });
      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        setError(null);
        setSuccessMessage("Account created successfully!");
        
        // Reset form fields
        setUsername('');
        setEmail('');
        setPassword('');
        setMobileNumber('');
        setNationality('');
        setDOB('');
        setJob('');
        setProfilePicture(null);
        setIsTermsAccepted(false);

        setAdvertiserId(json._id); // Store advertiser ID for potential deletion
        console.log('New advertiser added:', json);
      }
    } catch (err) {
      setError("An error occurred during account creation. Please try again.");
      console.error("Error during signup:", err);
    }
  };

  // Handle account deletion request
  const handleDeleteAccount = async () => {
    if (!advertiserId) {
      setError("Account deletion is only possible after account creation.");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to delete your account?");
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/AdvertiserRoute/deleteAccount/${advertiserId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Account deleted successfully.");
        setAdvertiserId(null); // Clear advertiser ID after deletion
      } else {
        setError(result.error);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Sign up</button>
      {isVisible && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Advertiser Signup</h3>

          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />

          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <label>Mobile Number:</label>
          <input
            type="text"
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
          />

          <label>Job:</label>
          <input
            type="text"
            onChange={(e) => setJob(e.target.value)}
            value={job}
          />

          <label>Nationality:</label>
          <input
            type="text"
            onChange={(e) => setNationality(e.target.value)}
            value={nationality}
          />

          <label>Date of Birth:</label>
          <input
            type="date"
            onChange={(e) => setDOB(e.target.value)}
            value={dob}
          />

          <label>Profile Picture:</label>
          <input
            type="file"
            onChange={(e) => setProfilePicture(e.target.files[0])}
          />

          <label>
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
            />
            Accept terms and conditions
          </label>

          <button type="submit">Signup</button>

          {/* Display error or success messages */}
          {error && <div className="error" style={{ color: 'red' }}>{error}</div>}
          {successMessage && <div className="success" style={{ color: 'green' }}>{successMessage}</div>}

          
        </form>
      )}
    </div>
  );
};

export default AdvertiserForm;
