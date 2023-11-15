var express = require('express');
const eagle_controlers=require('../controllers/eagle');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('eagle', { title: 'Search results by Sumedh' });
});
/* GET detail eagle page */
router.get('/detail', eagle_controlers.eagle_view_one_Page);
module.exports = router;