const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
require('dotenv').config();

// register user 
exports.registerUser = async (req, res) => {
    const { Name, Email, Password } =  req.body;
    try {
        if(! Name || Name === ''){
            return res.status(401).json({ message: 'Name is required' });
        }

        if(! Email || Email === ''){
            return res.status(402).json({ message: 'Email is required' });
        }
        let existing_user = await userModel.findOne({ email : Email });
        if(existing_user){
            return res.status(403).json({ message: 'User already exists' });
        }
        if(! Password || Password === ''){
            return res.status(404).json({ message: 'Password is required' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(Password, salt);

        const user = new userModel({
            Name,
            Email,
            Password : hashPassword
        });
        await user.save();
        res.status(201).json(user);
        
    } catch (error) {
        console.error(error);
        res.status(409).json({ message: error.message });
    }
};

// login user
exports.loginUser = async (req, res) => {
    const { Email, Password } =  req.body;
    try {
        if(! Email || Email === ''){
            return res.status(401).json({ message: 'Email is required' });
        }
        let user = await userModel.findOne({ Email });
        if(! user){
            return res.status(402).json({ message: 'User not found' });
        }
        if(! Password || Password === ''){
            return res.status(403).json({ message: 'Password is required' });
        }
        const validPassword = await bcrypt.compare(Password, user.Password);
        if(! validPassword){
            return res.status(404).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ _id: user._id , name:user.Name , email:user.Email }, process.env.JWT_SECRET , { expiresIn: '2h' });
        res.cookie('token',token , { httpOnly: true });
        //res.status(200).json({ message: 'Login successful' });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(409).json({ message: error.message });
    }
};

// logout user
exports.logoutUser = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
