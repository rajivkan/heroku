var mongoose = require('mongoose');
var express=require('express');
var app=express();
var router=express.Router();

router.get('/test', function(req, res) {
	console.log("request received in V1 test app");
	// any logic goes here
	res.end('Got it on V1 Test');
});

module.exports = router;