var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('eagle', { title: 'Search results by Sumedh' });
});

module.exports = router;