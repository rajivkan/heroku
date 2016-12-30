var localStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var strategyJWT = require('passport-jwt').Strategy;  
var extractJWT = require('passport-jwt').ExtractJwt;
var User = require('../models/userSchema.js');
var config = require('config');

// module.exports = function(passport) {
//     passport.serializeUser(function(user, done) {
//         done(null, user.id);
//     });

//     passport.deserializeUser(function(id, done) {
//         User.findById(id, function(err, user) {
//             done(err, user);
//         });
//     });

//     passport.use('local-signup', new localStrategy({
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true,
//         },
//         function(req, email, password, done) {
//             process.nextTick(function() {
//                 User.findOne({
//                     'email': email
//                 }, function(err, user) {
//                     if (err) {
//                         return done(err);
//                     }

//                     if (user) {
//                         return done(null, false, req.flash('message', 'That email is already in use.'));
//                     } else {
//                         var newUser = new User();
//                         newUser.email = email;
//                         //newUser.password = newUser.generateHash(password);
//                         newUser.password = password;
//                         newUser.save(function(err) {
//                             if (err)
//                                 throw err;
//                             return done(null, newUser);
//                         });
//                     }
//                 });
//             });
//         }
//     ));

//     passport.use('local-login', new localStrategy({
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true,
//         },
//         function(req, email, password, done) {
//             console.log(email);
//             User.findOne({
//                 'email': email
//             }, function(err, user) {
//                 if (err) {
//                     return done(err);
//                 }

//                 if (!user) {
//                     console.log('No user found.');
//                     return done(null, false, req.flash('message', 'No user found.'));
//                 }

//                 if (user.password != password) {
//                     console.log('Wrong password.');
//                     return done(null, false, req.flash('message', 'Wrong password.'));
//                 }

//                 return done(null, user);
//             });
//         }
//     ));    
// };


// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = extractJWT.fromAuthHeader();
  opts.secretOrKey = config.get('server.secretKey');
  console.log(opts);
  passport.use(new strategyJWT(opts, function(jwt_payload, done) {    
    console.log("jwt_payload======================");
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};