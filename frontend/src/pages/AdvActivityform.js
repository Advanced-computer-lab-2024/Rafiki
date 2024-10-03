import React, { useState } from 'react';

const ActivityManager = () => {
    const [activities, setActivities] = useState([]);
    const [activity, setActivity] = useState({
        id: '',
        date: '',
        time: '',
        location: '',
        price: '',
        category: '',
        tags: '',
        specialDiscounts: '',
        bookingOpen: false,
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setActivity({
            ...activity,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const addActivity = () => {
        if (!activity.date || !activity.time || !activity.location || !activity.price || !activity.category) {
            alert('Please fill in all required fields.');
            return;
        }
        setActivities([...activities, { ...activity, id: Date.now() }]);
        resetActivity();
    };

    const deleteActivity = (id) => {
        setActivities(activities.filter(act => act.id !== id));
    };

    const updateActivity = (id) => {
        const updatedActivities = activities.map(act => (act.id === id ? activity : act));
        setActivities(updatedActivities);
        resetActivity();
    };

    const resetActivity = () => {
        setActivity({
            id: '',
            date: '',
            time: '',
            location: '',
            price: '',
            category: '',
            tags: '',
            specialDiscounts: '',
            bookingOpen: false,
        });
    };

    return (
        <div>
            <h2>Activity Manager</h2>
            <input type="date" name="date" value={activity.date} onChange={handleInputChange} required />
            <input type="time" name="time" value={activity.time} onChange={handleInputChange} required />
            <input type="text" name="location" value={activity.location} onChange={handleInputChange} placeholder="Location" required />
            <input type="text" name="price" value={activity.price} onChange={handleInputChange} placeholder="Price" required />
            <input type="text" name="category" value={activity.category} onChange={handleInputChange} placeholder="Category" required />
            <input type="text" name="tags" value={activity.tags} onChange={handleInputChange} placeholder="Tags" />
            <input type="text" name="specialDiscounts" value={activity.specialDiscounts} onChange={handleInputChange} placeholder="Special Discounts" />
            <label>
                Booking Open:
                <input type="checkbox" name="bookingOpen" checked={activity.bookingOpen} onChange={handleInputChange} />
            </label>
            <button onClick={addActivity}>Add Activity</button>
            <ul>
                {activities.map(act => (
                    <li key={act.id}>
                        <span>{`${act.date} ${act.time} - ${act.location} - ${act.price} - ${act.category} - ${act.tags} - ${act.specialDiscounts}`}</span>
                        <button onClick={() => deleteActivity(act.id)}>Delete</button>
                        <button onClick={() => setActivity(act)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityManager;
