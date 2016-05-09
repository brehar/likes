'use strict';

var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;