var Animal = require('../models/animal');
// List of all Animals
//exports.animal_list = function(req, res) {
//res.send('NOT IMPLEMENTED: Animal list');
//};

// List of all Animals
exports.animal_list = async function(req, res) {
try{
theAnimals = await Animal.find();
res.send(theAnimals);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

// for a specific Animal.
exports.animal_detail = function(req, res) {
res.send('NOT IMPLEMENTED: Animal detail: ' + req.params.id);
};
// Handle Animal create on POST.
exports.animal_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: Animal create POST');
};
// Handle Animal delete form on DELETE.
exports.animal_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Animal delete DELETE ' + req.params.id);
};
// Handle Animal update form on PUT.
exports.animal_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Animal update PUT' + req.params.id);
};
