const express = require('express');
const userModel = require('../models/user.model')
const { body, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/register', (req, res) =>{
    res.render('register');
})

router.post('/register',
    body('email').trim().isEmail().isLength({min: 12}),
    body('username').trim().isLength({min: 4}),
    body('password').trim().isLength({min: 6}),
     async (req, res) => {
    try {
        const { username, email, key, againKey } = req.body;

        if (key !== againKey) {
            return res.status(400).send("Passwords do not match");
        }

        const hashPassword = await bcrypt.hash(key, 10);

        await userModel.create({
            username: username,
            email: email,
            password: hashPassword
        });

        console.log("done");
        res.redirect("/user/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error registering user");
    }
});


module.exports = router;