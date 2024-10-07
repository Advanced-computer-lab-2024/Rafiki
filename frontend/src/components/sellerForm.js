import { useState } from 'react';

const SellerForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents page reload when the form is submitted

    const seller = { 
        Username: username, // Use correct casing
        Email: email,
        Password: password,
        Name: name,
        Description: description 
    };

    const response = await fetch('/api/sellerRoute', { // Ensure correct endpoint
        method: 'POST',
        body: JSON.stringify(seller),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const json = await response.json();

    if (!response.ok) {
        setError(json.error);
    } else {
        setError(null);
        setUsername('');  // Clear the form fields
        setEmail('');
        setPassword('');
        setName('');
        setDescription('');
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
        <form className="create" onSubmit={handleSubmit}>
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

          <button type="submit">Signup</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default SellerForm;
