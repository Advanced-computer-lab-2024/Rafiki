const ProductDetails = ({ product }) => {
    return (
        <div className="product-details">
            <h4>{product.Name}</h4>
            <p><strong>Picture: </strong>${product.Picture}</p>
            <p><strong>Price: </strong>${product.Price.toFixed(2)}</p>
            <p><strong>Description: </strong>{product.Description}</p>
            <p><strong>Seller: </strong>{product.Seller}</p>
            <p><strong>Ratings: </strong>{product.Ratings}</p>
            <p><strong>Reviews: </strong>{product.Reviews}</p>
            <p><strong>AvailableQuantity: </strong>{product.AvailableQuantity}</p>
        </div>
    );
}

export default ProductDetails;
