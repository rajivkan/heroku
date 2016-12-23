var express = require('express'),
    router = express.Router(),
    app = express();

router.use(require('./logIn/logInController'));

router.use(require('./signUp/signUpController'));

//Return router
module.exports=router;