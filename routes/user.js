var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

function validUser(usr) {
    return new Promise((resolve, reject) => {
        if (usr.username.includes('@')) {
            reject('Invalid username');
        }

        User.findOne( {email: usr.email}, function(err, user) {
            if (err) {
                reject('Database error');
            }
            if (user) {
                reject('Duplicate email');
            }
            User.findOne({username: usr.username}, function (err, user) {
                if (err) {
                    reject('Database error');
                }
                if (user) {
                    reject('Duplicate username');
                }
                resolve('Valid user');
            });
        });
    });
}

router.post('/', function(req, res, next) {
    validUser(req.body)
        .catch(msg => {
            res.status(400).json({
                title: 'Invalid credentials',
                error: msg
            });
        })
        .then(() => {
            const user = new User({
                username: req.body.username,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: bcrypt.hashSync(req.body.password, 10),
                email: req.body.email
            });
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'User created successfully',
                    obj: result
                });
            });
        });
});

router.post('/signin', function(req,res,next) {
    //look for user with matching username or password
    //username must be validated on creation to not be an email address to prevent duplication/auth issues
    User.findOne( { $or: [{email: req.body.email}, {username: req.body.email}] }, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Invalid credentials',
                error: { message: 'Invalid credentials' }
            });
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: 'Invalid credentials',
                error: { message: 'Invalid credentials' }
            });
        }
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        });
    });
});

router.get('/check-duplicate', function(req,res,next) {
    User.findOne({username: req.params.username}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(200).json({
                message: 'Username is available',
                available: true
            });
        }
        res.status(200).json({
            message: 'Username is taken',
            available: false
        });
    })
});

module.exports = router;