const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    Name : {
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('User', userSchema);
