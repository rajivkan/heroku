var express = require('express'),
    router = express.Router(),
    app = express();

router.use('/v1',require('./v1/dummyController_V1'));

router.use('/v2',require('./v2/dummyController_V2'));

//Return router
module.exports=router;