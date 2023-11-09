var express = require('express');
const animal_controlers= require('../controller/animal');
var router = express.Router();
/* GET animals */
router.get('/', animal_controlers.animal_view_all_Page );
module.exports = router;



