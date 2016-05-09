'use strict';

var express = require('express');
var router = express.Router();

var Message = require('../models/message');

router.get('/', (req, res) => {
    Message.find({}).exec((err, messages) => {
        res.status(err ? 400 : 200).send(err || messages);
    });
});

router.post('/', (req, res) => {
    var message = new Message(req.body);

    message.save((err, savedMessage) => {
        res.status(err ? 400 : 200).send(err || savedMessage);
    });
});

router.put('/:id', (req, res) => {
    Message.findById(req.params.id).exec((err, message) => {
        message.likes++;

        message.save((err, savedMessage) => {
            res.status(err ? 400 : 200).send(err || savedMessage);
        });
    });
});

module.exports = router;