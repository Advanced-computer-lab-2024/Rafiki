import React, { useState, useEffect } from 'react';import PaymentForm from '../components/paymentForm';


const MuseumDetails = ({ museum}) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
  const [tourists, setTourists] = useState([]); // To store the list of tourists
  const [walletBalance, setWalletBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isCancelable, setIsCancelable] = useState(false);



  useEffect(() => {
    const fetchTourists = async () => {
        try {
            const response = await fetch('/api/TouristRoute');
            if (response.ok) {
                const data = await response.json();
                setTourists(data);
            }
        } catch (error) {
            console.error("Error fetching tourists:", error);
        }
    };
    fetchTourists();
}, []);


  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/museums/${museum._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };
  const shareViaEmail = () => {
    const link = `${window.location.origin}/museum/${museum._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20musuem&body=Here%20is%20an%20musuem%20I%20found:%20${link}`;
  };

  const handleCurrencyChange = (e) => {
      const selectedCurrency = e.target.value;
      setCurrency(selectedCurrency);
  
      // Set the conversion rate based on the selected currency
      switch (selectedCurrency) {
        case 'EGP':
          setCurrencyMultiplier(50);
          break;
        case 'EUR':
          setCurrencyMultiplier(0.92);
          break;
        default: // USD
          setCurrencyMultiplier(1);
      }
    };


    const cancelMuseumBooking = async () => {
      const name = prompt("Please enter your name to cancel the booking of the Museum:");
      if (!name) {
          alert("Name is required to cancel the booking of the museum.");
          return;
      }
  
      const tourist = tourists.find(t => t.Username.toLowerCase() === name.toLowerCase());
      if (!tourist) {
          alert("Tourist not found. Please ensure your name is correct.");
          return;
      }
  
      try {
          const response = await fetch(`/api/TouristRoute/cancelMuseumBooking`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ touristId: tourist._id, museumId: museum._id })
          });
  
          if (response.ok) {
              const updatedTourist = await response.json();
              console.log("Updated Tourist:", updatedTourist);  // Log the response to check the returned data
              
              alert("Canceled the booking of the museum successfully!");
  
              // Ensure this field is correct (check the backend response structure)
              setWalletBalance(updatedTourist.newWalletBalance);  // Adjust this if the field name is different
          } else {
              alert("Failed to cancel the booking of the museum.");
          }
      } catch (error) {
          console.error("Error canceling the booking of the museum:", error);
      }
  };
  








    const handlePaymentClickMuseum = (museum) => {
        setSelectedMuseum(museum);
        setIsPaymentVisible(prev => !prev);
    };
    return (
      <div className="workout-details">
        <h4>{museum.name}</h4>
        <p><strong>Description: </strong>{museum.description}</p>
        <p><strong>Location: </strong>{museum.location}</p>
        <p><strong>Opening Hours: </strong>{museum.openingHours}</p>
        <p><strong> Ticket Price: </strong>
        {currency} {(parseFloat(museum.ticketPrices) * currencyMultiplier).toFixed(2)}
        <select value={currency} onChange={handleCurrencyChange} style={{ marginLeft: '10px' }}>
          <option value="USD">USD</option>
          <option value="EGP">EGP</option>
          <option value="EUR">EUR</option>
        </select>
      </p>
        <p><strong>Picture: </strong>{museum.pictures}</p>
        <p><strong>Tag: </strong>{museum.tag }</p>  
        {/* <button onClick={() => onEdit(museum)}>Edit</button>
        <button onClick={() => onDelete(museum._id)}>Delete</button> */}
        <button onClick={() => handlePaymentClickMuseum(museum)}>
        Pay for this Museum
        </button>
         {/* Render Payment Form if visible */}
         {isPaymentVisible && (
                <PaymentForm
                    price={(selectedMuseum.ticketPrices * currencyMultiplier).toFixed(2)}
                    tourists={tourists} // Pass the tourists list here
                    paymentType="Museum" // Set payment type as "Museum"
                    referenceId={museum._id} // Pass the museum _id as referenceId
                />
            )}
             <button onClick={cancelMuseumBooking} >
                Cancel Booking
            </button>

            {walletBalance !== null && (
    <p><strong>Updated Wallet Balance: </strong>{walletBalance}</p>
)}

            {error && <p className="error">{error}</p>}
            {!isCancelable && (
                <p className="error">Booking cancellation is only allowed more than 48 hours in advance.</p>
            )}
        
        <button onClick={copyLinkToClipboard}>Copy museum Link</button>
        <button onClick={shareViaEmail}>Share via Email</button>
      </div>

      
    );
  };
  
  export default MuseumDetails;
  