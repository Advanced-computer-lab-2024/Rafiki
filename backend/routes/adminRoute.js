const express = require('express');
const router = express.Router();
const { deleteAccount, addTourismGovernor, addAdmin,getAdmin, changePassword} = require('../controllers/adminController');

// Route to delete an account by ID
router.delete('/deleteAccount/:id', deleteAccount);

// Route to add a Tourism Governor
router.post('/addTourismGovernor', addTourismGovernor);

// Route to add another admin
router.post('/addAdmin', addAdmin);
router.get('/',getAdmin);

router.post('/changePassword', changePassword);


module.exports = router;
