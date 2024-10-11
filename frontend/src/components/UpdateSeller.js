import { useState, useEffect } from 'react';

const UpdateSeller= ({ existingTourguide, onUpdate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [Username, setUsername] = useState(existingTourguide ? existingTourguide.Username : '');
    const [Email, setEmail] = useState(existingTourguide ? existingTourguide.Email : '');
    // const [Password, setPassword] = useState('');
    const [Name, setName] = useState(existingTourguide ? existingTourguide.Name : '');
    const [Description, setDescription] = useState(existingTourguide ? existingTourguide.Description : '');
    // const [DOB, setDOB] = useState(existingTourguide ? existingTourguide.DOB : '');
    // const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingTourguide) {
            setUsername(existingTourguide.Username);
            setEmail(existingTourguide.Email);
            setName(existingTourguide.Name);
            setDescription(existingTourguide.Description);
            // setDOB(existingTourguide.DOB);
            // setJob(existingTourguide.Job);
        } else {
            // Reset the form if there's no existing tour guide
            setUsername('');
            setEmail('');
            setName('');
            setDescription('');
            // setDOB('');
            // setJob('');
        }
    }, [existingTourguide]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tourguide = { Username, Email };

        const method = existingTourguide ? 'PUT' : 'POST';
        const url = existingTourguide ? `/api/sellerRoute/${existingTourguide._id}` : '/api/sellerRoute';

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
                <form className="create" onSubmit={handleSubmit}>
                    <h3>{existingTourguide ? 'Update seller' : 'update seller'}</h3>

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

<label>Descriptiom:</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={Description}
                    />


<label>Name:</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={Name}
                    />


                    <button>{existingTourguide ? 'Update' : 'update'}</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default UpdateSeller;
