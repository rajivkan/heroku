var express = require('express'),
    passport = require('passport'),
    session = require('express-session'),
    flash = require('connect-flash'),
    app = express(),
    User = require('../../../models/userSchema.js'),
    router = express.Router();

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

// router.post('/signup', passport.authenticate('local-signup', {
//     //successRedirect: '/', 
//     failureRedirect: '/api/v1/signup',
//     failureFlash: true,
// }), function(req, res) {

//     console.log("Comes on signup API");

//     // any logic goes here
//     res.end('Sign Up');
//     //res.redirect('/profile');
// });


// Initialize passport for use
app.use(passport.initialize());

// Register new users
router.post('/signup', function(req, res) {
    if (!req.body.email || !req.body.password) {
        res.json({
            success: false,
            message: 'Please enter email and password.'
        });
    } else {
        var newUser = new User({
            email: req.body.email,
            password: req.body.password
        });

        // Attempt to save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'That email address already exists.'
                });
            }

            res.json({
                success: true,
                message: 'Successfully created new user.'
            });
        });
    }
});

module.exports = router;