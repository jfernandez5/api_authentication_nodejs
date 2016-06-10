/**
 * Created by Javier on 17/05/2016.
 */
var express = require('express');
var User = require('../model/user');

module.exports = (function() {
    var route = express.Router();

    var setUp = function(req, res, next) {
        //create a sample user
        var user = new User({
            name: req.body.name,
            userId: req.body.userId,
            password: req.body.password,
            admin: req.body.admin,
            status: req.body.status
        });
        user.save(function(err){
            if(err) {
                console.log(err);
                res.json({ success:false });
            } else {
                console.log('User saved successfully');
                res.json({ success: true});
            }
        });
    }

    route.post('/setup', setUp);

    return route;
})();