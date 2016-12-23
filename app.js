var express = require('express');
// 	mongoose = require('mongoose'),
// 	bodyParser = require('body-parser'),
// 	methodOverride = require('method-override'),
// 	passport = require('passport'),
// 	session = require('express-session'),
// 	flash = require('connect-flash'),
// 	jwt = require('jsonwebtoken'),
// 	jwtSimple = require('jwt-simple'),
// 	logger = require('./logger')();
// var _ = require('lodash');

// Create the application
var app = express();

app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) {
  response.end("hi ");
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// Middleware necessary for REST API's
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));
// app.use(bodyParser.json());
// app.use(methodOverride('X-HTTP-Method-Override'));

// // CORS Support
// app.use(function(req, res, next) {
// 	console.log(req.method);
// 	if (req.method === 'OPTIONS' || req.method === 'GET' || req.method === 'POST') {
// 		res.header('Access-Control-Allow-Origin', '*');
// 		res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
// 		res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
// 		res.header('Access-Control-Expose-Headers', 'Content-Length');
// 		res.header('Access-Control-Allow-Credentials', true);
// 		//res.send(200);
// 		return next();
// 	} else {
// 		return next();
// 	}
// });

// // Config details based on env
// var config = require('config');

// // Passport authentication process
// require('./middlewares/passport')(passport);

// app.use(session({
// 	secret: 'keyboard cat',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

// // Connecting to Master Database
// var masterDB = require('./config/db/masterDB');

// console.log("Server 1 working");

// // Load models
// app.models = require('./models/index');

// var routes = require('./routes');
// _.each(routes, function(controller, route) {
// 	app.use(route, require(controller));
// });

// // Protect dashboard route with JWT
// app.get('/dashboard', passport.authenticate('jwt', { session: false }), function(req, res) {  
//   console.log(req.user);
//   res.send('It worked! User id is: ' + req.user._id + '.');
// });

// // Protect dashboard route with JWT
// app.get('/sso', passport.authenticate('jwt', { session: false }), function(req, res) { 
//   console.log(req.headers.authorization+'\n');
//   //console.log(config.get('server.secretKey')+'\n');	
//   var encodedToken = jwtSimple.encode(req.headers.authorization, config.get('server.secretKey'));
//   //var encodedToken = req.headers.authorization;
//   console.log(encodedToken+'\n'); 
//   res.redirect(req.query.return_to + '?jwt=' + encodedToken);
// });

// app.listen(config.get('server.listenPort'));


// Connect to MongoDB
// mongoose.connect('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.dbName);
// mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
// mongoose.connection.once('open', function() {
	
//});