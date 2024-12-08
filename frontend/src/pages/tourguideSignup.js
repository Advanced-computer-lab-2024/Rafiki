//tourguidesignup

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import TourguideDetails from "../components/tourguideDetails";
import ItineraryDetails from "../components/itineraryDetails";
import ItineraryForm from "../components/itineraryForm";
import ActivityDetails from "../components/ActivityDetails";
import ChangePasswordForm from "../components/ChangePasswordForm";
import TermsPopup from "../components/TermsPopup";
import MonthlyReportDetails from "../components/MonthlyReportDetails"; // adjust based on your structure
import SalesReport from "../components/SalesReport";

const TourguideSignup = () => {
  const [showRevenue, setShowRevenue] = useState(false);

  const handleShowRevenue = () => {
    setShowRevenue("revenue");
  };
  const [tourguide, setTourguide] = useState(null); // Store a single tour guide
  const [itineraries, setItineraries] = useState(null);
  const [activities, setActivities] = useState(null);
  const [activeContent, setActiveContent] = useState("description"); // Default to description
  const [showPopup, setShowPopup] = useState(true); // Show terms popup initially
  const [reportData, setReportData] = useState(null); // Store report data
  const [showReport, setShowReport] = useState(false); // Control report modal visibility
  const [dateItinerary, setDateItinerary] = useState(""); // Store the selected date for filtering itineraries
  const [filteredItineraries, setFilteredItineraries] = useState(null); // Store filtered itineraries data
  const [isVisibleDateFilterItinerary, setIsVisibleDateFilterItinerary] = useState(false); // Control visibility of the date filter
  const [month, setMonth] = useState(""); // Selected month for the report
  const [monthlyReport, setMonthlyReport] = useState(null); // Store monthly report data
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [filterValue, setFilterValue] = useState("");
  const [filteredRevenue, setFilteredRevenue] = useState(0);
  const [filteredTourists, setFilteredTourists] = useState(0);
  
  const filterRevenue = (filterType, value) => {
    if (!itineraries) return;
  
    let filtered = itineraries;
  
    if (filterType === "itinerary" && value) {
      filtered = itineraries.filter((itinerary) =>
        itinerary.name.toLowerCase().includes(value.toLowerCase())
      );
    } else if (filterType === "date" && value) {
      filtered = itineraries.filter((itinerary) => itinerary.date === value);
    } else if (filterType === "month" && value) {
      filtered = itineraries.filter(
        (itinerary) =>
          new Date(itinerary.date).getMonth() === parseInt(value) - 1
      );
    }
  
    const revenue = filtered.reduce(
      (total, itinerary) => total + itinerary.price * itinerary.touristsAttended,
      0
    );
    const tourists = filtered.reduce(
      (total, itinerary) => total + itinerary.touristsAttended,
      0
    );
  
    setFilteredRevenue(revenue);
    setFilteredTourists(tourists);
  };
  

  const username = localStorage.getItem("loggedinUsername"); // Get the logged-in username

  useEffect(() => {
    const fetchTourguide = async () => {
      try {
        const response = await axios.get(`/api/tourguideRoute?username=${username}`);
        if (response.status === 200) setTourguide(response.data);
      } catch (err) {
        console.error("Error fetching tour guide details:", err);
      }
    };

    const fetchItineraries = async () => {
      const response = await fetch("/api/itineraryRoute");
      const json = await response.json();
      if (response.ok) setItineraries(json);
    };

    const fetchActivities = async () => {
      const response = await fetch("/api/ActivityRoute");
      const json = await response.json();
      if (response.ok) setActivities(json);
    };

    fetchTourguide();
    fetchItineraries();
    fetchActivities();
  }, [username]);


  const handleAccept = async () => {
    try {
      await axios.post("/api/tourguideRoute/accept-terms", { username });
      setShowPopup(false); // Hide popup
    } catch (error) {
      console.error("Error accepting terms:", error);
      alert("Failed to accept terms. Please try again.");
    }
  };

  const fetchReport = async () => {
    try {
        if (tourguide) {
            // Fetch the total tourists for the tour guide
            const response = await axios.get(`/api/tourguideRoute/${tourguide._id}/tourists-total`);
            setReportData(response.data);
            setShowReport(true); // Display the report
        } else {
            alert("Tour guide details not available.");
        }
    } catch (error) {
        console.error("Error fetching report data:", error.response?.data || error.message);
        alert("Failed to fetch report. Please try again.");
    }
  };


  const fetchMonthlyReport = async () => {
    if (!month) return;
    try {
      const response = await fetch(`/api/tourguideRoute/${tourguide._id}/tourists-per-month/${month}`);
      const data = await response.json();
      setMonthlyReport(data);
    } catch (error) {
      console.error("Error fetching monthly report:", error);
    }
  };

  const itineraryDateFilter = async () => {
    try {
      if (!dateItinerary) {
        alert("Please select a date to filter itineraries.");
        return;
      }

      // Call backend API to filter itineraries by date
      const response = await axios.get(`/api/itineraryRoute/filter-by-date/${dateItinerary}`);
      setFilteredItineraries(response.data); // Set the filtered itineraries
    } catch (error) {
      console.error("Error fetching filtered itineraries:", error.response?.data || error.message);
      alert("Failed to fetch filtered itineraries. Please try again.");
    }
  };

  const AdminChangePassword = () => (
    <ChangePasswordForm apiEndpoint="/api/tourguideRoute/changePassword" />
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar Navigation */}
      <div className="w-1/4 bg-gray-800 text-white p-6 h-full">
        <h3 className="text-xl font-bold mb-4">Tour Guide Dashboard</h3>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => setActiveContent("tourguides")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Tourguide Details
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("itineraries")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Itineraries
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("activities")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Show Activities
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("addItinerary")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Add New Itinerary
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveContent("changePassword")}
              className="text-lg text-blue-400 hover:text-white"
            >
              Change Password
            </button>
          </li>
          <li>
            <button
              onClick={handleShowRevenue}
              className="text-lg text-green-400 hover:text-white"
            >
              Show Revenue
            </button>
          </li>
          <li>
            <button
              onClick={() => setShowMonthlyReport(true)}
              className="text-lg text-green-400 hover:text-white"
            >
              Monthly Report
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6 overflow-y-auto">
        {/* Header */}
        {activeContent === "description" && (
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-3xl font-semibold text-gray-800">
              Welcome to Your Tour Guide Dashboard
            </h3>
            <p className="text-gray-600 mt-4">
              Use the sidebar to navigate and manage your details, itineraries,
              and reports.
            </p>
          </div>
        )}

        {/* Tourguide Section */}
        {activeContent === "tourguides" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tourguide Details
            </h3>
            {tourguide ? (
              <TourguideDetails tourguide={tourguide} />
            ) : (
              <p className="text-gray-500">No tour guide details available.</p>
            )}
          </div>
        )}

        {/* Itineraries Section */}
        {activeContent === "itineraries" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Itineraries
            </h3>
            {itineraries ? (
              <>
                <div className="text-center mb-6 bg-gray-100 p-4 rounded-lg shadow">
                  <p className="text-lg font-bold text-gray-800">
                    Total Revenue: $
                    {itineraries
                      .reduce(
                        (total, itinerary) =>
                          total + itinerary.price * itinerary.touristsAttended,
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <p className="text-lg font-bold text-gray-800">
                    Total Tourists Attended:{" "}
                    {itineraries.reduce(
                      (total, itinerary) => total + itinerary.touristsAttended,
                      0
                    )}
                  </p>
                </div>
                {itineraries.map((itinerary) => (
                  <ItineraryDetails key={itinerary._id} itinerary={itinerary} />
                ))}
              </>
            ) : (
              <p className="text-gray-500">No itineraries available.</p>
            )}
          </div>
        )}

        {/* Activities Section */}
        {activeContent === "activities" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Activities
            </h3>
            {activities ? (
              activities.map((activity) => (
                <ActivityDetails key={activity._id} activity={activity} />
              ))
            ) : (
              <p className="text-gray-500">No activities available.</p>
            )}
          </div>
        )}

        {/* Add Itinerary Section */}
        {activeContent === "addItinerary" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Itinerary
            </h3>
            <ItineraryForm />
          </div>
        )}

        {/* Change Password Section */}
        {activeContent === "changePassword" && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Change Password
            </h3>
            <AdminChangePassword />
          </div>
        )}

        {/* Monthly Report Section */}
        {showMonthlyReport && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Monthly Report
            </h3>
            <div className="flex items-center space-x-4 mb-4">
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="border p-2 rounded-lg"
              >
                <option value="">Select Month</option>
                <option value="0">January</option>
                <option value="1">February</option>
                <option value="2">March</option>
                <option value="3">April</option>
                <option value="4">May</option>
                <option value="5">June</option>
                <option value="6">July</option>
                <option value="7">August</option>
                <option value="8">September</option>
                <option value="9">October</option>
                <option value="10">November</option>
                <option value="11">December</option>
              </select>
              <button
                onClick={fetchMonthlyReport}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Fetch Report
              </button>
            </div>
            {monthlyReport ? (
              <MonthlyReportDetails data={monthlyReport} />
            ) : (
              <p className="text-gray-500">No report available for this month.</p>
            )}
          </div>
        )}

        {/* Report Modal */}
        {showReport && reportData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-4">Tourist Report</h3>
              <p>Total Tourists: {reportData.totalTourists}</p>
              <button
                onClick={() => setShowReport(false)}
                className="bg-red-500 text-white px-4 py-2 mt-4 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Terms Popup */}
        {showPopup && <TermsPopup onAccept={handleAccept} />}
      </div>
    </div>
  );
}

export default TourguideSignup;
