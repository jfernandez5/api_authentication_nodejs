/**
 * Created by Javier on 17/05/2016.
 */
var express = require('express');
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var config = require('../config/config');
var tokenManager = require('../config/token_manager');
var jwtExpress = require('express-jwt');

module.exports = (function(){
    var api = express.Router();

    api.post('/authenticate', function (req, res) {
        User.findOne({
            userId: req.body.userId
        }, function(err, user) {
            if(err) {
                console.log(err);
                return res.status(500).send({
                    success: false,
                    message: "Error ocurred!"
                });
            }
            if(!user) {
                res.json({success:false, message:'Authentication failed. User not found'});
            } else if(user) {
                //check user and password
                if(!user.comparePassword(req.body.password, user.password)) {
                    res.json({success: false, message:'Authentication failed. Wrong found'});
                } else {
                    var token = jwt.sign(user, config.secret, {
                        expiresIn: config.tokenExpiration
                    });

                    //return the info
                    res.json({
                        success: true,
                        message: 'Enjoy your token',
                        token: token
                    });
                }
            }
        });
    });
    
    api.get('/logout', function (req, res) {
        if(req.query.user) {
            tokenManager.expireToken(req.headers);
            delete req.query.user;
            return res.status(200).send({
                success: true,
                message: "Logout!"
            });
        } else {
            return res.status(401).send({
                success: false,
                message: "user parameter is missing"
            });
        }
    });
    
    api.get('/', function(req, res) {
        res.json({message: "Welcome to the coolest API"});
    });

    var listUsers = function (req, res) {
        User.find({}, function (err, users) {
            res.status(200).json(users);
        })
    };

    var handlerJwt = function (err, req, res, next) {
        if(err.name === 'UnauthorizedError') {
            console.log(err);
            res.status(401).send({
               success : false,
               message : err.message
            });
        } else {
            next();
        }
    }

    api.get('/users', jwtExpress({secret: config.secret}), handlerJwt, tokenManager.verifyToken, listUsers);

    return api;
})();