import React, { useState, useEffect } from 'react';
import PaymentForm from '../components/paymentForm';
import Swal from 'sweetalert2'; // SweetAlert for beautiful alerts
import { FaClipboard, FaEnvelope, FaPen, FaTrashAlt, FaMoneyBillWaveAlt, FaUndo } from 'react-icons/fa';

const MuseumDetails = ({ museum }) => {
    const [isPaymentVisible, setIsPaymentVisible] = useState(false);
    const [selectedMuseum, setSelectedMuseum] = useState(null);
    const [currency, setCurrency] = useState('USD');
    const [currencyMultiplier, setCurrencyMultiplier] = useState(1);
    const [tourists, setTourists] = useState([]);
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

    useEffect(() => {
        const museumDate = new Date(museum.date);
        const currentDate = new Date();
        const timeDifference = museumDate - currentDate;

        setIsCancelable(timeDifference > 48 * 60 * 60 * 1000); // Only allow cancellation 48 hours in advance
    }, [museum.date]);

    const copyLinkToClipboard = () => {
        const link = `${window.location.origin}/museums/${museum._id}`;
        navigator.clipboard.writeText(link)
            .then(() => Swal.fire('Link Copied!', 'The museum link has been copied to your clipboard.', 'success'))
            .catch(error => console.error("Failed to copy link:", error));
    };

    const shareViaEmail = () => {
        const link = `${window.location.origin}/museum/${museum._id}`;
        window.location.href = `mailto:?subject=Check%20out%20this%20museum&body=Here%20is%20a%20museum%20I%20found:%20${link}`;
    };

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;
        setCurrency(selectedCurrency);

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
        const name = prompt("Please enter your name to cancel the booking of the museum:");
        if (!name) {
            alert("Name is required to cancel the booking.");
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
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Canceled!',
                    text: `Your booking for the museum was successfully canceled. New Wallet Balance: ${updatedTourist.newWalletBalance}`,
                });
                setWalletBalance(updatedTourist.newWalletBalance);
            } else {
                alert("Failed to cancel the booking.");
            }
        } catch (error) {
            console.error("Error canceling the booking:", error);
            alert("An error occurred while trying to cancel the booking.");
        }
    };

    const handlePaymentClickMuseum = (museum) => {
        setSelectedMuseum(museum);
        setIsPaymentVisible(prev => !prev);
    };

    return (
        <div className="museum-details p-5 bg-white shadow-lg rounded-lg">
            <h4 className="text-2xl font-bold mb-4">{museum.name}</h4>
            <p><strong>Description: </strong>{museum.description}</p>
            <p><strong>Location: </strong>{museum.location}</p>
            <p><strong>Opening Hours: </strong>{museum.openingHours}</p>
            <p><strong>Ticket Price: </strong>
                {currency} {(parseFloat(museum.ticketPrices) * currencyMultiplier).toFixed(2)}
                <select value={currency} onChange={handleCurrencyChange} className="ml-2 border border-gray-300 p-1 rounded">
                    <option value="USD">USD</option>
                    <option value="EGP">EGP</option>
                    <option value="EUR">EUR</option>
                </select>
            </p>
            <p><strong>Tag: </strong>{museum.tag}</p>
            <div className="buttons mt-4 flex space-x-4">
                <button onClick={() => handlePaymentClickMuseum(museum)} className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center">
                    <FaMoneyBillWaveAlt className="mr-2" /> Pay for this Museum
                </button>
                {isPaymentVisible && (
                    <PaymentForm
                        price={(selectedMuseum.ticketPrices * currencyMultiplier).toFixed(2)}
                        tourists={tourists}
                        paymentType="Museum"
                        referenceId={museum._id}
                    />
                )}
                <button onClick={cancelMuseumBooking} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center" disabled={!isCancelable}>
                    <FaUndo className="mr-2" /> Cancel Booking
                </button>
            </div>
            <div className="wallet-balance mt-4">
                {walletBalance !== null && (
                    <p><strong>Updated Wallet Balance: </strong>{walletBalance}</p>
                )}
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {!isCancelable && (
                <p className="text-red-500 mt-2">Booking cancellation is only allowed more than 48 hours in advance.</p>
            )}

            <div className="social-sharing mt-4">
                <button onClick={copyLinkToClipboard} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full flex items-center">
                    <FaClipboard className="mr-2" /> Copy Museum Link
                </button>
                <button onClick={shareViaEmail} className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full flex items-center">
                    <FaEnvelope className="mr-2" /> Share via Email
                </button>
            </div>
        </div>
    );
};

export default MuseumDetails;
