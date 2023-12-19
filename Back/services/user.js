var usermodel = require("../models/user");

var register = function(userbody)
{
    return usermodel.register(userbody);
}

var findByUsername = async function(username)
{
    return await usermodel.find({username: username});
}
var login = function(userbody)
{
    return usermodel.login(userbody);
}
module.exports = {
    register,
    login,
    findByUsername
}