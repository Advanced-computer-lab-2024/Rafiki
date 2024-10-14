
import {useState} from 'react'
const ChangePasswordForm = ({ apiEndpoint }) => {
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, oldPassword, newPassword }),
            });

            const json = await response.json();

            if (response.ok) {
                setMessage('Password changed successfully');
                setUsername('');
                setOldPassword('');
                setNewPassword('');
            } else {
                setMessage(json.message || 'Error changing password');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred.');
        }
    };
    const handleClick = () => {
        setIsVisible(!isVisible);
      };
    return (

        <div>
    <button onClick={handleClick}>
        Change my password
      </button>
    {isVisible && (
        <form onSubmit={handleSubmit}>
            <h2>Change Password</h2>
            <label>Username</label>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <label>Old Password</label>
            <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
            />
            <label>New Password</label>
            <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <button type="submit">Change Password</button>
            {message && <p>{message}</p>}
        </form>
         )}
    </div>
    );
};

export default ChangePasswordForm;
// module.exports = ChangePasswordForm;