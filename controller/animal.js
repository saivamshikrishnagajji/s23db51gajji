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
//exports.animal_detail = function(req, res) {
//res.send('NOT IMPLEMENTED: Animal detail: ' + req.params.id);
//};
// Handle Animal create on POST.

// Handle Animal delete form on DELETE.
exports.animal_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Animal delete DELETE ' + req.params.id);
};
// Handle Animal update form on PUT.
// Handle Costume update form on PUT.
exports.animal_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await Animal.findById( req.params.id)
// Do updates of properties
if(req.body.animal_type)
toUpdate.animal_type = req.body.animal_type;
if(req.body.color) toUpdate.color = req.body.color;
if(req.body.wings) toUpdate.legs = req.body.wings;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
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
    document.wings = req.body.wings;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    

    // for a specific Costume.
    exports.animal_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Animal.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    

