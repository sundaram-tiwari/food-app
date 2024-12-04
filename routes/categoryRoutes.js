const express = require('express');
const { createCategory, getAllCategory, updateCategory, deleteCategory } = require('../controller/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createCategory',authMiddleware,createCategory);

router.get('/getAll',getAllCategory);

router.put('/update/:id',authMiddleware,updateCategory);

router.delete('/delete/:id',authMiddleware,deleteCategory);

module.exports = router;