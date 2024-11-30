const userModel = require('../model/userModel')

//Get user info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        //validation
        if (!user) {
            res.status(500).send({
                success: false,
                message: 'User Not Found'
            })
        }

        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'User Info',
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in getuser API',
            error
        })
    }
};


const updateUser = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.id });

        //validation
        if (!user) {
            res.status(500).send({
                success: false,
                message: 'User Not Found'
            })
        }

        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;

        await user.save();
        res.status(200).send({
            success: true,
            message: 'User Updated SUccessfully'
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Update User API',
            error
        })
    }
}
module.exports = { getUserController, updateUser }