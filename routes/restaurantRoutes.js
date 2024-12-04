const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createRestaurant, getAllRestaurant, getSingleRestaurant, deleteRestaurant } = require('../controller/restaurantController');

const router = express.Router();

router.post('/create',authMiddleware,createRestaurant);

router.get('/getAll',getAllRestaurant);

router.get('/getSingle/:id',getSingleRestaurant);

router.delete('/deleteRestaurant/:id',deleteRestaurant);

module.exports = router;