import React, { useState } from 'react';

const MuseumManager = () => {
    const [museums, setMuseums] = useState([]);
    const [museum, setMuseum] = useState({
        id: '',
        description: '',
        pictures: [],
        location: '',
        openingHours: '',
        ticketPrices: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMuseum({ ...museum, [name]: value });
    };

    const handleFileChange = (e) => {
        setMuseum({ ...museum, pictures: Array.from(e.target.files) });
    };

    const addMuseum = () => {
        if (!museum.description || !museum.location || !museum.openingHours || !museum.ticketPrices) {
            alert('Please fill in all required fields.');
            return;
        }
        setMuseums([...museums, { ...museum, id: Date.now() }]);
        resetMuseum();
    };

    const deleteMuseum = (id) => {
        setMuseums(museums.filter(m => m.id !== id));
    };

    const updateMuseum = (id) => {
        const updatedMuseums = museums.map(m => (m.id === id ? museum : m));
        setMuseums(updatedMuseums);
        resetMuseum();
    };

    const resetMuseum = () => {
        setMuseum({
            id: '',
            description: '',
            pictures: [],
            location: '',
            openingHours: '',
            ticketPrices: '',
        });
    };

    return (
        <div>
            <h2>Museum and Historical Places Manager</h2>
            <textarea
                name="description"
                value={museum.description}
                onChange={handleInputChange}
                placeholder="Description"
                required
            />
            <input
                type="text"
                name="location"
                value={museum.location}
                onChange={handleInputChange}
                placeholder="Location"
                required
            />
            <input
                type="text"
                name="openingHours"
                value={museum.openingHours}
                onChange={handleInputChange}
                placeholder="Opening Hours"
                required
            />
            <input
                type="text"
                name="ticketPrices"
                value={museum.ticketPrices}
                onChange={handleInputChange}
                placeholder="Ticket Prices (e.g., Native, Foreigner, Student)"
                required
            />
            <input
                type="file"
                name="pictures"
                accept="image/*"
                onChange={handleFileChange}
                multiple
            />
            <button onClick={addMuseum}>Add Museum</button>
            <ul>
                {museums.map(m => (
                    <li key={m.id}>
                        <p><strong>Description:</strong> {m.description}</p>
                        <p><strong>Location:</strong> {m.location}</p>
                        <p><strong>Opening Hours:</strong> {m.openingHours}</p>
                        <p><strong>Ticket Prices:</strong> {m.ticketPrices}</p>
                        <p><strong>Pictures:</strong> {m.pictures.map((pic, index) => (
                            <img key={index} src={URL.createObjectURL(pic)} alt="Museum" style={{ width: '50px', height: '50px' }} />
                        ))}</p>
                        <button onClick={() => deleteMuseum(m.id)}>Delete</button>
                        <button onClick={() => setMuseum(m)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TourismManagerMuseum;
