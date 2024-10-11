import { useState, useEffect } from 'react';

const UpdateSeller= ({ existingTourguide, onUpdate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [Date, setDate] = useState(existingTourguide ? existingTourguide.Date : '');
    const [Location, setLocation] = useState(existingTourguide ? existingTourguide.Location : '');
    // const [Password, setPassword] = useState('');
    const [SpecialDiscount, setSpecialDiscount] = useState(existingTourguide ? existingTourguide.SpecialDiscount : '');
    // const [Description, setDescription] = useState(existingTourguide ? existingTourguide.Description : '');
    // const [DOB, setDOB] = useState(existingTourguide ? existingTourguide.DOB : '');
    // const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingTourguide) {
            setDate(existingTourguide.Date);
            setLocation(existingTourguide.Location);
            setSpecialDiscount(existingTourguide.SpecialDiscount);
            // setDescription(existingTourguide.Description);
            // setDOB(existingTourguide.DOB);
            // setJob(existingTourguide.Job);
        } else {
            // Reset the form if there's no existing tour guide
            setDate('');
            setLocation('');
            setSpecialDiscount('');
            // setDescription('');
            // setDOB('');
            // setJob('');
        }
    }, [existingTourguide]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tourguide = { Date, Location };

        const method = existingTourguide ? 'PUT' : 'POST';
        const url = existingTourguide ? `/api/ActivityRoute/${existingTourguide._id}` : '/api/ActivityRoute';

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
                setDate('');
                setLocation('');
               
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
                <form classSpecialDiscount="create" onSubmit={handleSubmit}>
                    <h3>{existingTourguide ? 'Update Tourguide' : 'Tourguide Signup'}</h3>

                    <label>Date:</label>
                    <input
                        type="text"
                        onChange={(e) => setDate(e.target.value)}
                        value={Date}
                    />

                    <label>Location:</label>
                    <input
                        type="text"
                        onChange={(e) => setLocation(e.target.value)}
                        value={Location}
                    />

{/* <label>Descriptiom:</label>
                    <input
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                        value={Description}
                    /> */}


<label>SpecialDiscount:</label>
                    <input
                        type="text"
                        onChange={(e) => setSpecialDiscount(e.target.value)}
                        value={SpecialDiscount}
                    />

{/* <label>DOB:</label>
                    <input
                        type="text"
                        onChange={(e) => setDOB(e.target.value)}
                        value={DOB}
                    />

<label>Job:</label>
                    <input
                        type="text"
                        onChange={(e) => setJob(e.target.value)}
                        value={Job}
                    /> */}



                    <button>{existingTourguide ? 'Update' : 'update'}</button>
                    {error && <div classSpecialDiscount="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default UpdateSeller;
