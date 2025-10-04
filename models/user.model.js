const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: false,
        minlength: [ 4, 'Username must be atleast 4 letters long' ]
    },

    email:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minlength: [12, 'email must be 12 letters long' ]
    },

    password:{
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'password must be 6 letters long']
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;