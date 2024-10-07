const CategoryDetails = ({ category }) => { // Correct prop name
    return (
        <div className="category-details">
            <p><strong>Category: </strong>{category.name}</p>
        </div>
    );
};

export default CategoryDetails;
