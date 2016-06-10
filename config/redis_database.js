/**
 * Created by Javier on 07/06/2016.
 */

/* redis */
var redis = require('redis');
var config = require('./config');
var redisClient = redis.createClient(config.portDBRedis);


redisClient.on('error', function (err) {
    if(err) {
        console.log(err);
    }
});

redisClient.on('connect', function () {
    console.log("Redis is ready at port " + config.portDBRedis);
});

module.exports.redisClient = redisClient;