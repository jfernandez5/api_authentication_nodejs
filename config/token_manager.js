/**
 * Created by Javier on 07/06/2016.
 */

var redisClient = require('./redis_database').redisClient;
var config = require('./config');

function verifyToken(req, res, next) {
    var token = getToken(req.headers);
    if(token) {
        redisClient.hgetall(token, function (err, reply) {
            if(err) {
                console.log(err);
                return res.status(500).send({
                   success: false,
                   message: "Error ocurred"
                });
            }
            /* found in redis */
            if(reply) {
                return res.status(401).send({
                    success: false,
                    message: "The token was no longer valid"
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    }

};

function expireToken(headers) {
    var token = getToken(headers);
    if(token!=null) {
        redisClient.hmset(token, {is_expired: true});
        redisClient.expire(token, config.tokenExpiration);
    }
};

var getToken = function(headers) {
    if(headers && headers.authorization) {
        var auth = headers.authorization.split(" ");
        return auth[1];
    } else {
        return;
    }
}

module.exports.verifyToken = verifyToken;
module.exports.expireToken = expireToken;