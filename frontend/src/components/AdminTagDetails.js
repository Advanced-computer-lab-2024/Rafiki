import { useState } from 'react';

const AdminTagDetails = ({ Tag, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(Tag.name);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onUpdate(Tag._id, newName);
        setIsEditing(false);
    };







    return (
        <div className="tag-details">
             {isEditing ? (
                <input 
                    type="text" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                />
            ) : (
             <p><strong>Tag: </strong>{Tag.name}</p>
            )}

            {isEditing ? (
                <button onClick={handleSaveClick}>Save</button>
            ) : (
                <button onClick={handleEditClick}>Edit</button>
            )}
            <button onClick={() => onDelete(Tag._id)}>Delete</button>
        </div>
            
            
        


    );
};

export default AdminTagDetails;

