// TermsPopup.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPopup = ({ onAccept }) => {
  const navigate = useNavigate();

  const handleDecline = () => {
    navigate('/'); // Redirect to the home page if the user declines
  };

  useEffect(() => {
    // Disable scrolling while the popup is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto'; // Re-enable scrolling when the component unmounts
    };
  }, []);

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h2>Terms and Conditions</h2>
        <p>
          Welcome to our website. By accessing or using our platform, you agree
          to the following terms and conditions:
        </p>
        <ul>
          <li>
            You must be at least 18 years old to register and use our services.
          </li>
          <li>
            Your use of the platform must comply with all applicable laws and
            regulations.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account information.
          </li>
          <li>
            We reserve the right to modify or discontinue our services at any
            time.
          </li>
          <li>
            Your data may be used in accordance with our privacy policy.
          </li>
        </ul>
        <div style={styles.buttons}>
          <button onClick={onAccept} style={styles.button}>
            Accept
          </button>
          <button onClick={handleDecline} style={styles.button}>
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles for the pop-up
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popup: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: 'white',
  },
};

export default TermsPopup;
