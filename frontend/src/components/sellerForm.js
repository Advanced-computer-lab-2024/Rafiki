import { useState } from 'react';

const SellerForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState(null); // State for the uploaded picture
  const [acceptedTerms, setAcceptedTerms] = useState(false); // State for terms acceptance
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms and conditions are accepted
    if (!acceptedTerms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    // Create FormData to handle text fields and file upload
    const formData = new FormData();
    formData.append("Username", username);
    formData.append("Email", email);
    formData.append("Password", password);
    formData.append("Name", name);
    formData.append("Description", description);
    if (picture) {
      formData.append("picture", picture); // Append the file only if one was selected
    }

    // Make a POST request to the server
    const response = await fetch('/api/sellerRoute', {
      method: 'POST',
      body: formData, // Send formData directly
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setError(null);
      // Reset form fields after successful submission
      setUsername('');
      setEmail('');
      setPassword('');
      setName('');
      setDescription('');
      setPicture(null);
      setAcceptedTerms(false);
      console.log('New seller added:', json);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleClick}>
        {isVisible ? 'Hide' : 'Show'} Sign up
      </button>

      {isVisible && (
        <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
          <h3>Seller Signup</h3>

          <label>Username:</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />

          <label>Email:</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <label>Name:</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />

          <label>Description:</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />

          <label>Upload Picture:</label>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
            accept="image/*"
          />

          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={() => setAcceptedTerms(!acceptedTerms)}
            />
            Accept Terms and Conditions
          </label>

          <button type="submit">Signup</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default SellerForm;
