const express = require('express');
const { getUserController } = require('../controller/userController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

router.get('/getUser',authMiddleware, getUserController);

module.exports = router;