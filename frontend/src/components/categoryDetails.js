import { useState } from 'react';

const CategoryDetails = ({ category, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(category.name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onUpdate(category._id, newName);
        setIsEditing(false);
    };

    return (
        <div className="category-details">
            {isEditing ? (
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                />
            ) : (
                <p><strong>Category: </strong>{category.name}</p>
            )}

            {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
            <button onClick={() => onDelete(category._id)}>Delete</button>
        </div>
    );
};

export default CategoryDetails;
