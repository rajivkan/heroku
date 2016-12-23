var express = require('express');
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash'),
    app = express(),
    jwt = require('jsonwebtoken'),
    router = express.Router(),
    User = require('../../../models/userSchema.js'),
    config = require('config');

// Passport authentication process
require('../../../middlewares/passport')(passport);

// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// router.post('/login', passport.authenticate('local-login', {
//     //successRedirect: '/',
//     failureRedirect: '/api/v1/login',
//     failureFlash: true,
// }), function(req, res) {

//     // any logic goes here
//     res.end('Log In');
//     //res.redirect('/profile');
// });


// Initialize passport for use
app.use(passport.initialize());

router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.send({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else {
            // Check if password matches
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {
                    //user.iat = new Date().getTime() / 1000;
                    // Create token if the password matched and no error was thrown
                    var token = jwt.sign(user, config.get('server.secretKey'), {
                        expiresIn: 300 // in seconds
                    });
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Authentication failed. Passwords did not match.'
                    });
                }
            });
        }
    });
});

module.exports = router;