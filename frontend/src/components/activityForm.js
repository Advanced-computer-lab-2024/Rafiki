import { useState } from 'react';

const ActivityForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [specialDiscounts, setSpecialDiscounts] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Match field names with the backend expectation
    const activity = { date, time, price, location, category, tags, specialDiscounts };

    const response = await fetch('/api/ActivityRoute', {
      method: 'POST',
      body: JSON.stringify(activity),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setDate('');
      setTime('');
      setPrice('');
      setSpecialDiscounts('');
      setTags('');
      setCategory('');
      setLocation('');

      console.log('New activity added:', json);
    }
  };

  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={handleClick}>Create Activity</button>
      {isVisible && (
        <form className="create" onSubmit={handleSubmit}>
          <h3>Create Activity</h3>

          <label>Date:</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />

          <label>Time:</label>
          <input
            type="text"
            onChange={(e) => setTime(e.target.value)}
            value={time}
          />

          <label>Price:</label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />

          <label>Location:</label>
          <input
            type="text"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />

          <label>Category:</label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />

          <label>Tags:</label>
          <input
            type="text"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />

          <label>Special Discounts:</label>
          <input
            type="text"
            onChange={(e) => setSpecialDiscounts(e.target.value)}
            value={specialDiscounts}
          />

          <button>Create</button>
          {error && <div className="error">{error}</div>}
        </form>
      )}
    </div>
  );
};

export default ActivityForm;
