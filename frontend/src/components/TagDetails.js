const TagDetails = ({ Tag}) => { // Correct prop name
    return (
        <div className="category-details">
            <p><strong>Tag: </strong>{Tag.name}</p>
        </div>
    );
};

export default TagDetails;
