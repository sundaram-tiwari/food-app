const express = require('express');
const { getUserController, updateUser, updatePassword, forgetPassword, resetPassword } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserController);

router.put('/updateUser',authMiddleware, updateUser);

router.put('/updatePassword',authMiddleware,updatePassword);

router.post('/forgetPassword',forgetPassword);

router.post('/resetPassword/:token',resetPassword);

module.exports = router;