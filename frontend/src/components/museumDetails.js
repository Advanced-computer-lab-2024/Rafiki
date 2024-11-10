import React, { useState } from 'react';

const MuseumDetails = ({ museum}) => {
  const [currency, setCurrency] = useState('USD');
  const [currencyMultiplier, setCurrencyMultiplier] = useState(1);

  const copyLinkToClipboard = () => {
    const link = `${window.location.origin}/museums/${museum._id}`;
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(error => console.error("Failed to copy link:", error));
  };
  const shareViaEmail = () => {
    const link = `${window.location.origin}/museums/${museum._id}`;
    window.location.href = `mailto:?subject=Check%20out%20this%20musuems&body=Here%20is%20an%20musuems%20I%20found:%20${link}`;
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
        <button onClick={copyLinkToClipboard}>Copy museum Link</button>
        <button onClick={shareViaEmail}>Share via Email</button>
      </div>
    );
  };
  
  export default MuseumDetails;
  