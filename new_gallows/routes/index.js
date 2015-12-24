var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', require('./homepage').get);

// Playground page
router.get('/playground', require('./playground').get);

router.get('/playgroundAJAX', require('./playgroundAJAX').get);

router.post('/login', require('./login').post);
router.post('/logout', require('./logout').post);

module.exports = router;
