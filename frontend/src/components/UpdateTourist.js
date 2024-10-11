import { useState, useEffect } from 'react';

const UpdateTourist= ({ existingTourguide, onUpdate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [Username, setUsername] = useState(existingTourguide ? existingTourguide.UserWallet : '');
    const [Email, setEmail] = useState(existingTourguide ? existingTourguide.Email : '');
    // const [Password, setPassword] = useState('');
    const [Wallet, setWallet] = useState(existingTourguide ? existingTourguide.Wallet : '');
    const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
    // const [DOB, setDOB] = useState(existingTourguide ? existingTourguide.DOB : '');
    // const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingTourguide) {
            setUsername(existingTourguide.UserWallet);
            setEmail(existingTourguide.Email);
            setWallet(existingTourguide.Wallet);
            setJob(existingTourguide.Job);
            // setDOB(existingTourguide.DOB);
            // setJob(existingTourguide.Job);
        } else {
            // Reset the form if there's no existing tour guide
            setUsername('');
            setEmail('');
            setWallet('');
            setJob('');
            // setDOB('');
            // setJob('');
        }
    }, [existingTourguide]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tourguide = { Username, Email,Wallet,Job };

        const method = existingTourguide ? 'PUT' : 'POST';
        const url = existingTourguide ? `/api/TouristRoute/${existingTourguide._id}` : '/api/TouristRoute';

        const response = await fetch(url, {
            method,
            body: JSON.stringify(tourguide),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            // Reset form fields after successful submission
            if (!existingTourguide) {
                setUsername('');
                setEmail('');
               
            }
            console.log(existingTourguide ? 'Advertiser updated:' : 'New advertiser added:', json);
            if (onUpdate) onUpdate(); // Call the onUpdate prop if provided
        }
    };

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} {existingTourguide ? 'Update' : 'update'}
            </button>
            {isVisible && (
                <form classWallet="create" onSubmit={handleSubmit}>
                    <h3>{existingTourguide ? 'Update Tourguide' : 'Tourguide Signup'}</h3>

                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                    />

                    <label>Email:</label>
                    <input
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                    />

<label>Job:</label>
                    <input
                        type="text"
                        onChange={(e) => setJob(e.target.value)}
                        value={Job}
                    />


<label>Wallet:</label>
                    <input
                        type="text"
                        onChange={(e) => setWallet(e.target.value)}
                        value={Wallet}
                    />


                    <button>{existingTourguide ? 'Update' : 'update'}</button>
                    {error && <div classWallet="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default UpdateTourist;
