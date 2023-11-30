var express = require('express');
const animal_controlers= require('../controller/animal');
var router = express.Router();
/* GET animals */
// redirect to login.
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
router.get('/', animal_controlers.animal_view_all_Page );
router.get('/detail', secured, animal_controlers.animal_view_one_Page);
router.get('/create',secured, animal_controlers.animal_create_Page);

router.get('/update',secured, animal_controlers.animal_update_Page);
router.get('/delete',secured, animal_controlers.animal_delete_Page);


module.exports = router;



