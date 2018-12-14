const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitter');


const query = '#liveperson';

/* GET users listing. */
router.get('/', twitterController.getTweets);



module.exports = router;
