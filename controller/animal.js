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

// Handle Animal delete form on DELETE.
exports.animal_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Animal delete DELETE ' + req.params.id);
};
// Handle Animal update form on PUT.
exports.animal_update_put = function(req, res) {
res.send('NOT IMPLEMENTED: Animal update PUT' + req.params.id);
};

//VIEWS
// Handle a show all view
exports.animal_view_all_Page = async function(req, res) {
try{
theAnimals = await Animal.find();
res.render('animals', { title: 'Animal Search Results', results: theAnimals });
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

/* GET animals */

exports.animal_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Animal();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"animal_type":"goat", "cost":12, "size":"large"}
    document.animal_type = req.body.animal_type;
    document.color = req.body.color;
    document.legs = req.body.legs;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    


