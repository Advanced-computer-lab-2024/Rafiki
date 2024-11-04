const Transportation = require('../models/transportation');

// Create a Transportation

const createTransportation = async (req, res) => {
    console.log(req.body);
    const {
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        departureLocation,
        arrivalLocation,
        price,
        vehicleType,
        seatsAvailable,
    } = req.body;
    try {
        const transportation = await Transportation.create({
            departureDate,
            departureTime,
            arrivalDate,
            arrivalTime,
            departureLocation,
            arrivalLocation,
            price,
            vehicleType,
            seatsAvailable,
        });
        res.status(201).json(transportation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllTransportations = async (req, res) => {
    try {
        const transportations = await Transportation.find({});
        res.status(200).json(transportations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get a single Transportation by ID
const getTransportationById = async (req, res) => {
    const { id } = req.params;
    try {
        const transportation = await Transportation.findById(id);
        if (!transportation) {
            return res.status(404).json({ message: "Transportation not found." });
        }
        res.status(200).json(transportation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a Transportation by ID
const updateTransportation = async (req, res) => {
    const { id } = req.params;
    const {
        departureDate,
        departureTime,
        arrivalDate,
        arrivalTime,
        departureLocation,
        arrivalLocation,
        price,
        vehicleType,
        seatsAvailable,
    } = req.body;
    try {
        const transportation = await Transportation.findByIdAndUpdate(
            id,
            {
                departureDate,
                departureTime,
                arrivalDate,
                arrivalTime,
                departureLocation,
                arrivalLocation,
                price,
                vehicleType,
                seatsAvailable,
            },
            { new: true }
        );
        if (!transportation) {
            return res.status(404).json({ message: "Transportation not found." });
        }
        res.status(200).json(transportation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a Transportation by ID
const deleteTransportation = async (req, res) => {
    const { id } = req.params;
    try {
        const transportation = await Transportation.findByIdAndDelete(id);
        if (!transportation) {
            return res.status(404).json({ message: "Transportation not found." });
        }
        res.status(200).json({ message: "Transportation deleted successfully." });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Search Transportations by Vehicle Type
const searchTransportationsByVehicleType = async (req, res) => {
    const { vehicleType } = req.params;
    try {
        const transportations = await Transportation.find({ vehicleType: { $regex: vehicleType, $options: 'i' } });
        if (transportations.length === 0) {
            return res.status(404).json({ message: "No transportations found with that vehicle type." });
        }
        res.status(200).json(transportations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const searchTransportationsByDepartureLocation = async (req, res) => {
    const { departureLocation } = req.params;
    try {
        const transportations = await Transportation.find({ departureLocation: { $regex: departureLocation, $options: 'i' } });
        if (transportations.length === 0) {
            return res.status(404).json({ message: "No transportations found with that departure location." });
        }
        res.status(200).json(transportations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get transportations by arrival date
const getTransportationsByArrivalDate = async (req, res) => {
    const { arrivalDate } = req.params;
    try {
        const transportations = await Transportation.find({
            arrivalDate: {
                $gte: new Date(arrivalDate),
                $lt: new Date(arrivalDate + 'T23:59:59.999Z'),
            },
        });
        if (transportations.length === 0) {
            return res.status(404).json({ message: "No transportations found for this date." });
        }
        res.status(200).json(transportations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTransportationsSortedByPrice = async (req, res) => {
    try {
        const transportations = await Transportation.find({}).sort({ price: 1 });
        if (transportations.length === 0) {
            return res.status(404).json({ message: "No transportations found." });
        }
        res.status(200).json(transportations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTransportation,
    getAllTransportations,
    getTransportationById,
    updateTransportation,
    deleteTransportation,
    searchTransportationsByVehicleType,
    searchTransportationsByDepartureLocation,
    getTransportationsByArrivalDate,
    getTransportationsSortedByPrice,
};
