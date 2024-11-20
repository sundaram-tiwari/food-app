const userModel = require("../model/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

const userRegister = async (req, res) => {
    try {
        const { userName, email, password, phone, address } = req.body
        //validation
        if (!userName || !email || !password || !phone || !address) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide All Fileds'
            })
        }
        //check user
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'Email Already Register Please Login'
            })
        }
        //hasing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //create new user
        const user = await userModel.create({ userName, email, password: hashedPassword, address, phone })
        res.status(201).send({
            success: true,
            message: 'user Register Successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Register API',
            error,
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation    
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'Please Provide Email And Password'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User Not Found'
            })
        }
        //check user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: 'Incorrect Password'
            })
        }

        //token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User Login Successfully',
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        })
    }
}

module.exports = { userRegister, userLogin }