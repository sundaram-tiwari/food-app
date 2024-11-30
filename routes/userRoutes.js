const express = require('express');
const { getUserController, updateUser } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserController);

router.put('/updateUser',authMiddleware, updateUser);

module.exports = router;