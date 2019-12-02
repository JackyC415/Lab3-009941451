const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
//const keys = require("./setting");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return callback(null, user);
          }
          return callback(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};