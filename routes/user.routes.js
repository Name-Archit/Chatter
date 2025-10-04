const express = require('express');
const { body, validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login');
});

router.post(
    '/login',
    body('email')
        .trim()
        .isEmail()
        .isLength({ min: 12 })
        .withMessage('Email must be at least 12 characters long'),
    body('password').trim().isLength({ min: 3 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid input data',
            });
        }

        const { email, password } = req.body;
        const User = await userModel.findOne({ email: email });

        if (!User) {
            return res.status(400).json({ message: 'password or email is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, User.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'password or email is incorrect' });
        }

        const token = jwt.sign(
            {
                userId: User._id,
                email: User.email,
                username: User.username,
            },
            process.env.JWT_SECRET
        );

        
        res.cookie('token', token, {
            httpOnly: true, 
            secure: false, 
        });
        
        res.redirect('/user/index');
    }
);

module.exports = router;
