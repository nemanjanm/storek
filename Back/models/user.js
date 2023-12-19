var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

var UserSchema = new Schema({
    username: {type: String, required: true},
    hash: { type: String},
    salt: {type: String }
})

UserSchema.methods.savePassword = function (password)
{
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,"sha512").toString('hex')
}

UserSchema.methods.validatePassword = function (password)
{
    hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,"sha512").toString('hex')
    return hash === this.hash;
}

UserSchema.methods.generateJwt = function()
{
    var expire = new Date();
    expire.setDate(expire.getDate()+7);

    return jwt.sign({
        _id: this._id,
        expire: parseInt(expire.getTime()/1000)
    }, "SECRET")
}

var UserModel = mongoose.model('user',UserSchema);

UserModel.register = async function(userbody)
{
    var user = new UserModel({
        username:userbody.username
    })

    user.savePassword(userbody.password)
    try
    {
        await user.save();
        console.log(user)
        console.log(user.generateJwt())
        return user.generateJwt();
    }
    catch
    {
        return null;
    }
}
 
var generateLoginJwt = function(id)
{
    var expire = new Date();
    expire.setDate(expire.getDate()+7);

    return jwt.sign({
        _id: id,
        expire: parseInt(expire.getTime()/1000)
    }, "SECRET")
}

var validatePassword = function (oldhash, salt, password)
{
    hash = crypto.pbkdf2Sync(password, salt, 1000,64,"sha512").toString('hex')
    return hash === oldhash;
}

UserModel.login = async function(userbody)
{
    var user = await UserModel.findOne({username: userbody.username});
    if(!user)
        return null;
    if(!validatePassword(user.hash, user.salt, userbody.password))
        return null;
    return generateLoginJwt(user._id);
}
module.exports = UserModel