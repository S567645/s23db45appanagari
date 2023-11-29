var express = require('express');
const eagle_controlers=require('../controllers/eagle');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('eagle', { title: 'Search results by Sumedh' });
});
/* GET detail eagle page */
router.get('/detail', eagle_controlers.eagle_view_one_Page);
/* GET create eagle page */
router.get('/create', eagle_controlers.eagle_create_Page);
/* GET create update page */
router.get('/update',secured, eagle_controlers.eagle_update_Page);
/* GET delete eagle page */
router.get('/delete', eagle_controlers.eagle_delete_Page);


module.exports = router;