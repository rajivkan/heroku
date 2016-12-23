var mongoose = require('mongoose');
var express=require('express');
var app=express();
var router=express.Router();

router.use('/test', function (req, res, next) {
    console.log('Request URL:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type:', req.method);
    next();
});

router.get('/test', function(req, res, next) {
    console.log(req.headers.host + '  ' + req.originalUrl );
    console.log("request received on first V2 test api");
    
    // any logic goes here
    res.write(req.headers.host + '  ' + req.originalUrl + '\n');
    next();
});

router.use('/test', function (req, res, next) {
    console.log('Request URL 2:', req.originalUrl);
    next();
}, function (req, res, next) {
    console.log('Request Type 2:', req.method);
    next();
});

router.get('/test', function (req, res, next) {
    console.log("request received on second V2 test api");
    res.end('Got it on V2 Test');	
})

module.exports = router;