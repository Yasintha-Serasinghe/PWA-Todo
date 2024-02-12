const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({

    Title : {
        type: String,
        required: true
    },
    Status:{
        type: String,
        enum: ['To-Do', 'Progress', 'Completed'],
        default: 'To-Do',
    },
    
    Priority:{
        type: String,
        enum: ['Low', 'Normal', 'High'],
        default: 'Low',
    },

    DueDate:{
        type: Date,
        default: null,
    },

    Comment:{
        type: String,
    },

    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    CreatedAt:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Todo', todoSchema);

