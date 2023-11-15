var express = require('express');
const animal_controlers= require('../controller/animal');
var router = express.Router();
/* GET animals */
router.get('/', animal_controlers.animal_view_all_Page );
router.get('/detail', animal_controlers.animal_view_one_Page);
router.get('/create', animal_controlers.animal_create_Page);

router.get('/update', animal_controlers.animal_update_Page);
router.get('/delete', animal_controlers.animal_delete_Page);


module.exports = router;



