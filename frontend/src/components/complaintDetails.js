import React, { useState } from "react";
import { FaEdit, FaSave, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ComplaintDetails = ({ complaint }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [isEditingStatus, setIsEditingStatus] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleReplySubmit = async () => {
    try {
      const response = await fetch(`/api/complaintRoute/${complaint._id}/reply`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reply: newReply }),
      });
      const updatedComplaint = await response.json();
      if (response.ok) {
        setIsEditingReply(false);
        // Optionally update parent component's complaints state here
      } else {
        console.error(updatedComplaint.error);
      }
    } catch (error) {
      console.error("Failed to update reply:", error);
    }
  };

  const handleStatusSubmit = async () => {
    try {
      const response = await fetch(`/api/complaintRoute/${complaint._id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedComplaint = await response.json();
      if (response.ok) {
        setIsEditingStatus(false);
        // Optionally update parent component's complaints state here
      } else {
        console.error(updatedComplaint.error);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
      <h4 className="text-lg font-bold text-gray-800">{complaint.title}</h4>
      <p className="text-sm text-gray-600">
        <strong>Date:</strong> {complaint.date}
      </p>
      <p className="text-sm text-gray-600">
        <strong>Status:</strong> {complaint.status}
      </p>

      <button
        onClick={toggleDetails}
        className="flex items-center mt-2 text-blue-500 hover:text-blue-600"
      >
        {showDetails ? (
          <>
            <FaChevronUp className="mr-1" />
            Show Less
          </>
        ) : (
          <>
            <FaChevronDown className="mr-1" />
            Show More
          </>
        )}
      </button>

      {showDetails && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <strong>Name:</strong> {complaint.username}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Description:</strong> {complaint.body}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Reply:</strong> {complaint.reply || "No reply yet."}
          </p>

          {isEditingReply ? (
            <div className="mt-3">
              <textarea
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                rows="3"
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your reply"
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleReplySubmit}
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <FaSave className="mr-1" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingReply(false)}
                  className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <FaTimes className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingReply(true)}
              className="flex items-center mt-2 text-blue-500 hover:text-blue-600"
            >
              <FaEdit className="mr-1" />
              Edit Reply
            </button>
          )}

          {isEditingStatus ? (
            <div className="mt-3">
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Status</option>
                <option value="resolved">Resolved</option>
                <option value="pending">Pending</option>
              </select>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleStatusSubmit}
                  className="flex items-center px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  <FaSave className="mr-1" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditingStatus(false)}
                  className="flex items-center px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  <FaTimes className="mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingStatus(true)}
              className="flex items-center mt-2 text-blue-500 hover:text-blue-600"
            >
              <FaEdit className="mr-1" />
              Edit Status
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplaintDetails;
