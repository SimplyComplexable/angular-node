var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var Message = require('../models/message');
var User = require('../models/user');

router.get('/', function(req, res, next) {
    let searchParams;

    //get thread query parameter
    let thread = req.query.thread ? req.query.thread :"public";

    //if blank assume public thread
    if (!thread || thread === "public") {
        //include both explicit and implicit public messages
        searchParams = {$or: [
            { "tags.thread": { $size: 0 } },
            { "tags.thread": "public" }
        ]};
    } else {
        //check for multiple threads
        if (thread.includes(',')) {
            let threads = thread.split(',');
            searchParams = {$or: []};
            for (let thrd of threads) {
                searchParams.$or.push({ "tags.thread": thrd });
            }
        } else {
            searchParams = { "tags.thread": thread };
        }
    }
    if (req.query.date) {
        searchParams = { $and: [
            { date: { $gt: req.query.date } },
            searchParams
        ]}
    }
    Message.find(searchParams)
        .populate('user', ['username', 'firstName'])
        .exec(function(err, messages) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: messages
            })
        });
});

router.use('/', function(req, res, next) {
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        //check for thread tags
        let content = req.body.content;
        const contentWords = content.split(' ');
        let threads = [];

        if (req.query.thread) {
            threads.push(req.query.thread);
        }

        for (let word of contentWords) {
            if (word.startsWith('#')) {
                threads.push(word.slice(1));
                content = content.replace(word + ' ', '');
            }
        }

        var message = new Message({
            content: content,
            tags: {
                thread: threads
            },
            user: user
        });
        message.save(function(err, message) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.messages.push(message);
            user.save(function(err, user) {
                res.status(201).json({
                    message: 'Saved message',
                    obj: message
                });
            });
        });
    });
});

router.patch('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred when finding the message',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'An message found',
                error: { message: 'Message not found' }
            });
        }
        if(message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Invalid token' }
            });
        }
        message.content = req.body.content;
        message.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred when saving the message',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});

router.delete('/:id', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred when finding the message',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'An message found',
                error: { message: 'Message not found' }
            });
        }
        if(message.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: { message: 'Invalid token' }
            });
        }
        message.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred when deleting the message',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

router.get('/threads', function(req,res,next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }

        Message.find().distinct('tags.thread', { user: user.id }, function(err, threads) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: {
                        title: "what",
                        message: "something"
                    }
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: threads
            });
        });
    });
});

module.exports = router;