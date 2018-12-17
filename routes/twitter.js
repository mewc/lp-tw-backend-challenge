const express = require('express');
const router = express.Router();
const twitterController = require('../controllers/twitter');


const query = '#liveperson';

/* GET users listing. */
router.get('/', twitterController.getTweetsFromApi); //most recent
router.get('/api', twitterController.getTweetsFromApi);
router.get('/db', twitterController.getTweetsFromDb);

module.exports = router;
