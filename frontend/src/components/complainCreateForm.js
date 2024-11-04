import { useState, useEffect } from 'react';
import ComplaintUsernameDetails from '../components/complaintUsenamedetails';

const ComplainCreateForm = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [Title, setComplainTitle] = useState('');
    const [Username, setComplainUsername] = useState('');
    const [Body, setComplainBody] = useState('');
    const [Date, setComplainDate] = useState('');
    const [error, setError] = useState(null);

    const [isVisibleComplaints, setIsVisibleComplaints] = useState(false);
    const [isVisibleSearchMuseums, setIsVisibleSearchMuseums] = useState(false);

    const [complaints, setComplaints] = useState([]);

    const [name, setName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const Complaint = {
            username: Username,
            title: Title,
            body: Body,
            date: Date
        };
        
        const response = await fetch('/api/complaintRoute', {
            method: 'POST',
            body: JSON.stringify(Complaint),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            setComplainUsername('');
            setComplainTitle('');
            setComplainBody('');
            setComplainDate('');
            console.log('New complaint added:', json);
            // Optionally reload complaints to include the new one
            fetchComplaints();
        }
    };

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    const fetchComplaints = async () => {
        const response = await fetch('/api/complaintRoute');
        const json = await response.json();
        if (response.ok) {
            setComplaints(json);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, []);

    const ComplaintNameSearch = async () => {
        const response = await fetch(`/api/complaintRoute/complaints/${name}`);
        const json = await response.json();
        if (response.ok) {
            setComplaints(json);
        }
    };


    const handleSearchAndToggle = () => {
        ComplaintNameSearch(); // Call the search function
        setIsVisibleComplaints(prev => !prev); // Toggle the visibility state
    };

    return (
        <div>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} Create Complaint
            </button>
            {isVisible && (
                <form className="create" onSubmit={handleSubmit}>
                    <h3>Complaint</h3>

                    <label>Username:</label>
                    <input 
                        type="text" 
                        onChange={(e) => setComplainUsername(e.target.value)} 
                        value={Username}
                    />

                    <label>Title:</label>
                    <input 
                        type="text" 
                        onChange={(e) => setComplainTitle(e.target.value)} 
                        value={Title}
                    />

                    <label>Body:</label>
                    <input 
                        type="text" 
                        onChange={(e) => setComplainBody(e.target.value)} 
                        value={Body} 
                    />

                    <label>Date:</label>
                    <input 
                        type="date" 
                        onChange={(e) => setComplainDate(e.target.value)} 
                        value={Date} 
                    />

                    <button>Create</button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
            {/* Search by Name */}
            <button onClick={() => setIsVisibleSearchMuseums(!isVisibleSearchMuseums)}>
                {isVisibleSearchMuseums ? 'Hide' : 'Search Complaint by Name'}
            </button>
            {isVisibleSearchMuseums && (
                <div>
                    <input 
                        type="text" 
                        placeholder="Enter Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <button onClick={handleSearchAndToggle }>Search</button>
                    <br />
            {isVisibleComplaints && (
                <div className="complaints">
                    {complaints && complaints.map(complaint => (
                        <ComplaintUsernameDetails complaint={complaint} key={complaint._id} />
                    ))}
                </div>
            )}
            <br />
                </div>
            )}
           
        </div>
    );
};

export default ComplainCreateForm;
