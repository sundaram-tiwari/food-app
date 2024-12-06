const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { createFoodController, getAllFood, getSingleFood, getFoodByRestaurant, deleteFood, updateFood } = require('../controller/foodController');

const router = express.Router();

router.post('/create',authMiddleware,createFoodController);

router.get('/getAll',getAllFood);

router.get('/getSingle/:id',getSingleFood);

router.get('/getByRestaurant/:id',getFoodByRestaurant);

router.put('/update/:id',authMiddleware,updateFood);

router.delete('/deleteFood/:id',authMiddleware,deleteFood);

module.exports = router;