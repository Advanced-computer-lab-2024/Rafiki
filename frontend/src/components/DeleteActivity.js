// DeleteAdmin.js
import { useState } from 'react';

const DeleteActivity = () => {
    const [adminId, setAdminId] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        const response = await fetch(`/api/ActivityRoute/${adminId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setMessage('');
        } else {
            setMessage(json.message);
            setError('');
            setAdminId('');
        }
    };
    const handleClick = () => {
        setIsVisible(!isVisible);
      };

    return (
        <div>
            <button onClick={handleClick}>
         Delete Activity
      </button>
      {isVisible && (
        
            <form onSubmit={handleDelete}>
                <label>Activity ID:</label>
                <input
                    type="text"
                    onChange={(e) => setAdminId(e.target.value)}
                    value={adminId}
                />
                <button type="submit">Delete Activity</button>
            </form>
      )}
            {message && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
      
        </div>
    );
};

export default DeleteActivity;
