const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

//Get user info
const getUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email});
        //validation
        if (!user) {
            res.status(500).send({
                success: false,
                message: 'User Not Found'
            })
        }

        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'User Info',
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
        const user = await userModel.findOne({ email: req.body.email });

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

const updatePassword = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });


        const { oldPassword, newPassword } = req.body;

        //validation
        if (!oldPassword || !newPassword) {
            res.status(400).send({
                success: false,
                message: "Please Provide Old and New Password"
            })
        }

        //Password check
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(404).send({
                success: false,
                message: 'Incorrect old Password'
            })
        }

        //hasing new password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: false,
            message: "Password Changed Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update Password API',
            error
        })
    }
}

const forgetPassword = async (req, res) => { 
    try {
        const { email } = req.body;
        const token = req.headers["authorization"].split(" ")[1];

        //validation
        if(!email){
            return res.status(400).send({
                success:false,
                message:'Please Provide Your Email'
            })
        }

        const user = await userModel.findOne({email});
        if (!user) {
            res.status(500).send({
                success: false,
                message: 'User Not Found Please Register'
            })
        }

        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const receiver = {
            from : "sundaramtiwari04@gmail.com",
            to : email,
            subject : "Password Reset Request",
            text : `Click on this link to reset your password ${process.env.CLIENT_URL}/reset-password/${token}`
        }

        await transporter.sendMail(receiver);

        return res.status(200).send({
            success:true,
            message:"Password reset link sent successfully on your gmail"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in forget Password API!',
            error
        })
    }
}

const resetPassword = async (req, res) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        const { password } = req.body;

        //validation
        if(!password){
            return res.status(400).send({
                success:false,
                message:"Please provide new password"
            })
        }

        //verification
        const decode = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findOne({email:decode.email});

        if(!user){
            return res.status(400).send({
                sucess:false,
                message:"User not found"
            })
        }
        //hasing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).send({
            success:true,
            message:"Password has been reset successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in reset Password API!',
            error:error
        })
    }
}

const deleteUser = async (req,res) => {
    try {

        const { email } = req.body;
        //sending delete account mail
        const transporter = nodemailer.createTransport({
            service:"gmail",
            secure:true,
            auth:{
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASSWORD,
            },
        });

        const receiver = {
            from : "sundaramtiwari04@gmail.com",
            to : email,
            subject : "Deleted Account",
            text : `Your acount ${email} registered with our food-app-api has been deleted. Thank you for giving us uportunity to serve you.`
        }

        await transporter.sendMail(receiver);

        const user = await userModel.findOneAndDelete({ email: email });
        return res.status(200).send({
            success:false,
            message:"User Deleted Successfully"
        })
    } catch (error) {   
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete Password API!',
            error:error
        })
    }
}

module.exports = {
    getUserController,
    updateUser,
    updatePassword,
    forgetPassword,
    resetPassword,
    deleteUser
}