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
exports.animal_create_Page = function (req, res) {
    console.log("create view");
    res.render('animalcreate', { title: 'Animals Create' });
  };
  
  exports.animal_create = async function (req, res) {
    try {
      const { animal_type, color, legs } = req.body;
  
      // Create a new Aeroplane document
      const animal = new Animal({
        animal_type,
        color,
        legs,
      });
  
      // Save the document to the database
      await animal.save();
  
      res.status(201).json(animal); // Respond with the created Aeroplane document
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
    

exports.animal_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Animal.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
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

exports.animal_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Animal.findById( req.query.id)
    res.render('animaldetail',
    { title: 'Animal Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
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
    
    exports.animal_update_Page = async function(req, res) {
        console.log("update view for item " + req.query.id);
        try {
            let result = await Animal.findById(req.query.id);
            
            if (req.body.animal_type) result.animal_type = req.body.animal_type;
            if (req.body.color) result.color = req.body.color;
            if (req.body.legs) result.legs = req.body.legs;
    
            // Save the updated aeroplane data
            let updatedAnimal = await result.save();
            console.log("Update success: ", updatedAnimal);
            res.render('animalupdate', { title: 'Animal Update', toShow: updatedAnimal });
        } catch (err) {
            res.status(500).send({'error': '${err}'});
        }
    };
    

    exports.animal_delete_Page = async function(req, res) {
        console.log("Delete view for id " + req.query.id)
        try{
        result = await Animal.findById(req.query.id)
        res.render('animaldelete', { title: 'Animal Delete', toShow:
        result });
        }
        catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
        }
        };
      
        