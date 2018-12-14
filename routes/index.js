var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'lp-tw-backend-challenge', creator: 'https://github.com/mewc' });
});

module.exports = router;
