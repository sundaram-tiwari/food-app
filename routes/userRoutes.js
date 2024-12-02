const express = require('express');
const { getUserController, updateUser, updatePassword, forgetPassword, resetPassword, deleteUser} = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserController);

router.put('/updateUser',authMiddleware, updateUser);

router.put('/updatePassword',authMiddleware,updatePassword);

router.post('/forgetPassword',authMiddleware,forgetPassword);

router.post('/resetPassword',authMiddleware,resetPassword);

router.delete('/deleteUser',authMiddleware,deleteUser);

module.exports = router;