const express = require('express');
const router = express.Router();
const { deleteAccount, addTourismGovernor, addAdmin,getAdmin, changePassword,changeGovernorPassword,getAllGovernors,getTotalUsers,getNewUsersPerMonth } = require('../controllers/adminController');

// Route to delete an account by ID
router.delete('/deleteAccount/:id', deleteAccount);

// Route to add a Tourism Governor
router.post('/addTourismGovernor', addTourismGovernor);

// Route to add another admin
router.post('/addAdmin', addAdmin);
router.get('/',getAdmin);
router.get('/g',getAllGovernors )
router.post('/changePassword', changePassword);
router.post('/changeGovernorPassword',changeGovernorPassword) ;
router.get('/total-users', getTotalUsers);
router.get('/new-users-this-month', getNewUsersPerMonth);

module.exports = router;
