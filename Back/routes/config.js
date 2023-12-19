var passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy
var JwtExtractor = require('passport-jwt').ExtractJwt
var UserModel = require('../models/user');

var jwtOptions = {
    secretOrKey: "SECRET",
    jwtFromRequest: JwtExtractor.fromAuthHeaderAsBearerToken()
}

passport.use(new JwtStrategy(jwtOptions, async function(jwt_payload, done){
    var user = await UserModel.findById(jwt_payload._id)
    if (!user)
    {
        done(null, null ,{
            message: "Credentials not valid!"
        })
    }
    else
    {
        done(null, user)
    }

}))

module.exports = passport