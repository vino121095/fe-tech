require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../model/Usermodel');
const Admin = require('../model/AdminModel');
const { where } = require('sequelize');

// Register User
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, confirm_password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this useremail already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hashedConfirmPassword = await bcrypt.hash(confirm_password, 10);
        const newUser = await User.create({ 
            username, 
            email, 
            password: hashedPassword,
            confirm_password : hashedConfirmPassword
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: { username: newUser.username, email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.registerAdmin = async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
        const existingUser = await Admin.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this useremail already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Admin.create({ 
            email, 
            password: hashedPassword
        });

        res.status(201).json({
            message: 'Admin registered successfully',
            user: { email: newUser.email }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

// Login User
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user or admin by email
        const user = await User.findOne({ where: { email } });
        const admin = await Admin.findOne({ where: { email } });

        if (!user && !admin) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        let role;
        let entity; // Holds the logged-in entity (user or admin)
        let isMatch = false;

        if (user) {
            role = 'user';
            isMatch = await bcrypt.compare(password, user.password);
            entity = user;
        } else if (admin) {
            role = 'admin';
            isMatch = await bcrypt.compare(password, admin.password);
            entity = admin;
        }

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                email: entity.email,
                role,
            },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login successful',
            role,
            data: entity,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
