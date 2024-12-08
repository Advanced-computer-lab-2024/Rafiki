const express = require('express');
const router = express.Router();
const { deleteAccount,loginAdmin, addTourismGovernor, addAdmin,getAdmin, tourismGovernorLogin, changePassword,changeGovernorPassword,getAllGovernors,getTotalUsers,getNewUsersPerMonth,requestOTP,resetPassword,verifyOTP,requestOTPG,resetPasswordG,verifyOTPG } = require('../controllers/adminController');
// Route to delete an account by ID
router.delete('/deleteAccount/:id', deleteAccount);

// Route to add a Tourism Governor
router.post('/addTourismGovernor', addTourismGovernor);

// Route to add another admin
router.post('/login', loginAdmin);
router.post('/addAdmin', addAdmin);
router.get('/',getAdmin);
router.get('/g',getAllGovernors )
router.post('/changePassword', changePassword);
router.post('/changeGovernorPassword',changeGovernorPassword) ;
router.get('/total-users', getTotalUsers);
router.get('/new-users-this-month', getNewUsersPerMonth);
router.post('/login-gov', tourismGovernorLogin);
router.post('/requestOTP', requestOTP); // Reset password route after OTP is verified

router.post('/resetPassword', resetPassword); // Reset password route after OTP is verified
router.post('/verifyOTP', verifyOTP);  // Add route for OTP verification
router.post('/requestOTP', requestOTPG); // Reset password route after OTP is verified

router.post('/resetPassword', resetPasswordG); // Reset password route after OTP is verified
router.post('/verifyOTP', verifyOTPG);  // Add route for OTP verification
module.exports = router;
