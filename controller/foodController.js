const foodModel = require("../model/foodModel");


const createFoodController = async (req, res) => {
    try {
        const { title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        } = req.body;

        //validation
        if (!title || !description || !price || !restaurant) {
            return res.status(400).send({
                success: false,
                message: 'Please provide the required fields'
            })
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
            ratingCount
        });

        await newFood.save();
        res.status(200).send({
            success: true,
            message: 'New food created successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create food API'
        })
    }
}

const getAllFood = async (req, res) => {
    try {
        const foods = await foodModel.find();
        if (!foods) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            foodCount: foods.length,
            foods
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all food API'
        })
    }
}

const getSingleFood = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Please provide food id"
            })
        }
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get single food API'
        })
    }
}

const getFoodByRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: "Please provide Restaurant id"
            })
        }
        const food = await foodModel.findOneAndDelete(restaurantId);
        if (!food) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            food
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get food by restaurant id API'
        })
    }
}

const updateFood = async (req,res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please provide food id"
            })
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }

        const { title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            restaurant,
            rating } = req.body;

        const updatedFood = await foodModel.findByIdAndUpdate(foodId,{title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            restaurant,
            rating },{new:true});

        res.status(200).send({
            success:true,
            message:'food is updated'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in update food API'
        })
    }
}

const deleteFood = async (req,res) => {
    try {
        const foodId = req.params.id;
        if (!foodId) {
            return res.status(400).send({
                success: false,
                message: "Please provide food id"
            })
        }

        const food = await foodModel.findByIdAndDelete(foodId);
        if (!food) {
            return res.status(400).send({
                success: false,
                message: "No food found"
            })
        }
        res.status(200).send({
            success: true,
            message: 'Food successfully'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete food API'
        })
    }
}

module.exports = {
    createFoodController,
    getAllFood,
    getSingleFood,
    getFoodByRestaurant,
    updateFood,
    deleteFood
}