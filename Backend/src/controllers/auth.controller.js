const userModel = require('../models/user.models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlacklistModel = require('../models/blacklist.model');

async function registerUserController(req, res) {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserAreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    });

    if (isUserAreadyExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new userModel({
        username,
        email,
        password: passwordHash
    });
    await newUser.save();

    const token = jwt.sign(
        { id: newUser._id, username: newUser.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' });

    res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }
    });
}

async function loginUserController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'User does not exist!' });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);
    if (!decodedPassword) {
        return res.status(400).json({ message: 'Incorrect password!' });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
        message: 'User logged in successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

async function logoutUserController(req, res) {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if(!token){
        return res.status(400) .json({ message: 'No token found' });
    }

    // Add the token to the blacklist
    await tokenBlacklistModel.create({ token });

    // Clear the token cookie
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/"
    });

    res.status(200).json({ message: 'User logged out successfully' });
}

async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id);

    res.status(200).json({
        message: 'User details fetched successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
};