const ProductDetails = ({ product }) => {
    return (
        <div className="product-details">
            <h4>{product.Name}</h4>
            <p><strong>Price: </strong>${product.Price.toFixed(2)}</p>
            <p><strong>Description: </strong>{product.Description}</p>
            <p><strong>Category: </strong>{product.category}</p>
            <p><strong>Tags: </strong>{product.tags ? product.tags.join(', ') : 'N/A'}</p>
            <p><strong>Stock: </strong>{product.AvailableQuantity}</p>
        </div>
    );
}

export default ProductDetails;
