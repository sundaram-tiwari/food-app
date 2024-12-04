const restaurantModel = require("../model/restaurantModel");

//Create restaurant
const createRestaurant = async (req, res) => {
    try {
        const { title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logourl,
            rating,
            ratingCount,
            code,
            coords } = req.body;

        //validation
        if (!title || !coords) {
            return res.status(400).send({
                success: true,
                message: 'Please provide title and address'
            })
        }

        const restaurant = await restaurantModel.findOne({ title });
        if (restaurant) {
            return res.status(400).send({
                success: false,
                message: 'Restaurant already created'
            })
        }

        const newRestaurant = await restaurantModel.create({
            title,
            imageUrl,
            food,
            time,
            pickup,
            delivery,
            isOpen,
            logourl,
            rating,
            ratingCount,
            code,
            coords
        })

        // await newRestaurant.save();
        res.status(200).send({
            success: true,
            message: 'New restaurant created successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in create restaurant API'
        })
    }
}

const getAllRestaurant = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find();
        if (!restaurants) {
            res.status(400).send({
                success: false,
                message: 'No available restaurants'
            })
        }
        res.status(200).send({
            success: true,
            restaurantCount: restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get all restaurant API'
        })
    }
}

const getSingleRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        //valiation
        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide restaurant id'
            })
        }
        const restaurants = await restaurantModel.findById(restaurantId);
        if (!restaurants) {
            return res.status(400).send({
                success: false,
                message: 'No available restaurants'
            })
        }
        res.status(200).send({
            success: true,
            restaurants
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in get singlel restaurant API'
        })
    }
}

const deleteRestaurant = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        //valiation
        if (!restaurantId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide restaurant id'
            })
        }
        const restaurant = await restaurantModel.findOneAndDelete(restaurantId);
        return res.status(200).send({
            success: true,
            message: "Restaurant Deleted Successfully"
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in delete restaurant API'
        })
    }
}

module.exports = { createRestaurant, getAllRestaurant, getSingleRestaurant, deleteRestaurant };