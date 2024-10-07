const SellerDetails = ({ seller }) => {
    return (
        <div className="seller-details">
            <h4>{seller.Username}</h4> {/* Ensure this matches your data structure */}
            <p><strong>Username: </strong>{seller.Username}</p>
            <p><strong>Email: </strong>{seller.Email}</p>
            <p><strong>Name: </strong>{seller.Name}</p>
            <p><strong>Description: </strong>{seller.Description}</p>
         
        </div>
    );
};

export default SellerDetails;
