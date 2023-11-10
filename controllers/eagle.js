var eagle = require('../models/eagle');
// List of all eagle
exports.eagle_list = function(req, res) {
res.send('NOT IMPLEMENTED: eagle list');
};
// for a specific eagle.
//exports.eagle_detail = function(req, res) {
//res.send('NOT IMPLEMENTED: eagle detail: ' + req.params.id);
// for a specific eagle.
exports.eagle_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await eagle.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};


// Handle eagle create on POST.
exports.eagle_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: eagle create POST');
};
// Handle eagle delete form on DELETE.
exports.eagle_delete = function(req, res) {
res.send('NOT IMPLEMENTED: eagle delete DELETE ' + req.params.id);
};
// Handle eagle update form on PUT.
//exports.eagle_update_put = function(req, res) {
//res.send('NOT IMPLEMENTED: eagle update PUT' + req.params.id);
// Handle eagle update form on PUT.
exports.eagle_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await eagle.findById( req.params.id)
// Do updates of properties
if(req.body.eagle_color)
toUpdate.eagle_color = req.body.eagle_color;
if(req.body.eagle_breed) toUpdate.eagle_breed = req.body.eagle_breed;
if(req.body.eagle_price) toUpdate.eagle_price = req.body.eagle_price;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};


// List of all eagles
exports.eagle_list = async function(req, res) {
    try{
    theeagle = await eagle.find();
    res.send(theeagle);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    // VIEWS
// Handle a show all view
exports.eagle_view_all_Page = async function(req, res) {
    try{
    theeagle = await eagle.find();
    res.render('eagle', { title: 'eagle Search Results', results: theeagle });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    //Handle eagle create on POST.
exports.eagle_create_post = async function(req, res) {
console.log(req.body)
let document = new eagle();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"eagle_type":"goat", "cost":12, "size":"large"}
document.eagle_color = req.body.eagle_color;
document.eagle_breed = req.body.eagle_breed;
document.eagle_price = req.body.eagle_price;
try{
let result = await document.save();
res.send(result);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

    
    
