const express = require('express');
const router = express.Router();
const {
    createComplaint,getAllComplaints,updateStatus,updateReply,getComplaintsSortedbyDate,searchComplaintsbyStatus
} = require('../controllers/complaintController');


router.post('/', createComplaint);
router.get('/', getAllComplaints);
router.put('/:id/status', updateStatus);
router.put('/:id/reply', updateReply);
router.get('/sort/date', getComplaintsSortedbyDate);
router.get('/search/:status', searchComplaintsbyStatus);


module.exports = router;
