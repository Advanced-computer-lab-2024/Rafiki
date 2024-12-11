const Complaint = require('../models/complaint');

const createComplaint = async (req, res) => {
    const { username,title,body,date,status,reply } = req.body;
    try {
        const complaint = await Complaint.create({
            username,
            title, 
            body, 
            date, 
            status, 
            reply, 
        });
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllComplaints = async (req, res) => {
    
    try {
        const complaints = await Complaint.find({}); 
        res.status(200).json(complaints); // Return the filtered activities
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getComplaintsByUsername = async (req, res) => {
    const { username } = req.params; // Get username from request parameters

    try {
        const complaints = await Complaint.find({ username: username });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve complaints", error: error.message });
    }
};

const updateStatus = async (req, res) => {
    const { id } = req.params; // Extract ID from the request parameters
    const { status } = req.body; // Extract the new status from the request body

    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { status }, // Update the status field
            { new: true, runValidators: true } // Return the updated document
        );

        res.status(200).json(updatedComplaint); // Return the updated complaint
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle any errors
    }
};

const updateReply = async (req, res) => {
    const { id } = req.params; // Extract ID from the request parameters
    const { reply } = req.body; // Extract the new status from the request body

    try {
        const updatedComplaint = await Complaint.findByIdAndUpdate(
            id,
            { reply }, // Update the status field
            { new: true, runValidators: true } // Return the updated document
        );

        res.status(200).json(updatedComplaint); // Return the updated complaint
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle any errors
    }
};

const getComplaintsSortedbyDate = async (req, res) => {
    try {
        // Fetch and sort complaints by date in descending order (most recent first)
        const complaints = await Complaint.find({}).sort({ date: 1 }); 
        res.status(200).json(complaints); // Return the sorted complaints
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchComplaintsbyStatus = async (req, res) => {
    const { status } = req.params; // Get the tag from the request parameters
    try {
        const complaints = await Complaint.find({ status }); 
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Export the function
module.exports = { createComplaint, getAllComplaints, updateStatus ,updateReply,getComplaintsSortedbyDate
    ,searchComplaintsbyStatus,getComplaintsByUsername
};


