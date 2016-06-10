/**
 * Created by javier on 17/05/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
    name: String,
    userId: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    status: Boolean,
    created_at: Date,
    update_at: Date
}, {
    versionKey: false
});

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, false, false, function (err, hash) {
        user.password = hash;
        next();
    })
})

userSchema.methods.comparePassword = function (password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
}

var User = mongoose.model('User', userSchema);

module.exports = User;