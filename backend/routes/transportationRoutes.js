const express = require('express');
const router = express.Router();
const {
    createTransportation,
    getAllTransportations,
    getTransportationById,
    updateTransportation,
    deleteTransportation,
    searchTransportationsByVehicleType,
    searchTransportationsByDepartureLocation,
    getTransportationsByArrivalDate,
    getTransportationsSortedByPrice,
} = require('../controllers/transportationController');

// Routes
router.post('/createTransportation', createTransportation);
router.get('/getAllTransportations', getAllTransportations);
router.get('/:id', getTransportationById);
router.put('/:id', updateTransportation);
router.delete('/:id', deleteTransportation);
router.get('/searchV/:vehicleType', searchTransportationsByVehicleType);
router.get('/searchD/:departureLocation', searchTransportationsByDepartureLocation);
router.get('/filterA/:arrivalDate', getTransportationsByArrivalDate);
router.get('/sortP', getTransportationsSortedByPrice);

module.exports = router;
