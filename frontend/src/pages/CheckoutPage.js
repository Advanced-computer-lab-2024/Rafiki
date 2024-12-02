import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutPage = () => {
    const [addresses, setAddresses] = useState([]); // State to store the addresses
    const [selectedAddress, setSelectedAddress] = useState(null); // State to store the selected address
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage
        const username = localStorage.getItem("username");

        if (username) {
            // Fetch addresses using the username
            const fetchAddresses = async () => {
                try {
                    const response = await axios.get(`/api/TouristRoute/${username}/addresses`);
                    console.log("Fetched addresses:", response.data); // Log to verify the data
                    setAddresses(response.data.addresses); // Set the addresses to state
                } catch (error) {
                    console.error("Error fetching addresses:", error);
                }
            };

            fetchAddresses();
        } else {
            // If no username, navigate to login page
            navigate("/login");
        }
    }, [navigate]); // Effect depends on navigate

    const handleAddressSelect = (address) => {
        setSelectedAddress(address); // Store the selected address in state
    };

    const handleCheckout = () => {
        if (!selectedAddress) {
            alert("Please select an address to proceed."); // Alert if no address is selected
            return;
        }
        console.log("Proceeding with checkout using address:", selectedAddress);
        // You can navigate or process further here, e.g., submitting the checkout data
    };

    return (
        <div>
            <h2>Checkout Page</h2>
            <h3>Select Delivery Address</h3>
            {addresses.length > 0 ? (
                <div>
                    {addresses.map((address, index) => (
                        <div key={index} className="address-card">
                            <p>{address.street}</p>
                            <p>{address.city}</p>
                            <p>{address.postalCode}</p>
                            <button onClick={() => handleAddressSelect(address)}>Select this Address</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No addresses available</p>
            )}
            <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
    );
};

export default CheckoutPage;
