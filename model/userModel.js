const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'User name is required']
    },
    email: {
        type: String,
        required: [true, 'email is requiredd'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is requiredd']
    },
    address: {
        type: Array
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    usertype: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)