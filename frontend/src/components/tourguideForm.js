import { useState, useEffect } from 'react';

const TourguideForm = ({ existingTourguide, onUpdate }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [Username, setUsername] = useState(existingTourguide ? existingTourguide.Username : '');
    const [Email, setEmail] = useState(existingTourguide ? existingTourguide.Email : '');
    const [Password, setPassword] = useState('');
    const [MobileNumber, setMobileNumber] = useState(existingTourguide ? existingTourguide.MobileNumber : '');
    const [Nationalty, setNationalty] = useState(existingTourguide ? existingTourguide.Nationalty : '');
    const [DOB, setDOB] = useState(existingTourguide ? existingTourguide.DOB : '');
    const [Job, setJob] = useState(existingTourguide ? existingTourguide.Job : '');
    const [Picture, setPicture] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false); // New state for terms acceptance
    const [error, setError] = useState(null);

    useEffect(() => {
        if (existingTourguide) {
            setUsername(existingTourguide.Username);
            setEmail(existingTourguide.Email);
            setMobileNumber(existingTourguide.MobileNumber);
            setNationalty(existingTourguide.Nationalty);
            setDOB(existingTourguide.DOB);
            setJob(existingTourguide.Job);
            setPicture(null);
        } else {
            setUsername('');
            setEmail('');
            setMobileNumber('');
            setNationalty('');
            setDOB('');
            setJob('');
            setPicture(null);
        }
    }, [existingTourguide]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Username", Username);
        formData.append("Email", Email);
        formData.append("Password", Password);
        formData.append("MobileNumber", MobileNumber);
        formData.append("Nationalty", Nationalty);
        formData.append("DOB", DOB);
        formData.append("Job", Job);
        if (Picture) {
            formData.append("picture", Picture);
        }

        const method = existingTourguide ? 'PUT' : 'POST';
        const url = existingTourguide ? `/api/tourguideRoute/${existingTourguide._id}` : '/api/tourguideRoute';

        const response = await fetch(url, {
            method,
            body: formData,
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        } else {
            setError(null);
            if (!existingTourguide) {
                setUsername('');
                setEmail('');
                setPassword('');
                setMobileNumber('');
                setNationalty('');
                setDOB('');
                setJob('');
                setPicture(null);
                setTermsAccepted(false); // Reset termsAccepted after successful submission
            }
            console.log(existingTourguide ? 'Tourguide updated:' : 'New tourguide added:', json);
            if (onUpdate) onUpdate();
        }
    };

    const handleClick = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div>
            <button onClick={handleClick}>
                {isVisible ? 'Hide' : 'Show'} {existingTourguide ? 'Update' : 'Sign up'}
            </button>
            {isVisible && (
                <form className="create" onSubmit={handleSubmit} encType="multipart/form-data">
                    <h3>{existingTourguide ? 'Update Tourguide' : 'Tourguide Signup'}</h3>

                    <label>Username:</label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        value={Username}
                        required
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={Email}
                        required
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={Password}
                        required
                    />

                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        onChange={(e) => setMobileNumber(e.target.value)}
                        value={MobileNumber}
                        required
                    />

                    <label>Job:</label>
                    <input
                        type="text"
                        onChange={(e) => setJob(e.target.value)}
                        value={Job}
                        required
                    />

                    <label>Nationality:</label>
                    <input
                        type="text"
                        onChange={(e) => setNationalty(e.target.value)}
                        value={Nationalty}
                        required
                    />

                    <label>DOB:</label>
                    <input
                        type="date"
                        onChange={(e) => setDOB(e.target.value)}
                        value={DOB}
                        required
                    />

                    <label>Profile Picture:</label>
                    <input
                        type="file"
                        onChange={(e) => setPicture(e.target.files[0])}
                    />

                    <label>
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                        />
                        I accept the terms and conditions
                    </label>

                    <button type="submit" disabled={!termsAccepted}>
                        {existingTourguide ? 'Update' : 'Signup'}
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            )}
        </div>
    );
};

export default TourguideForm;
