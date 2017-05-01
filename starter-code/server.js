
var express 	= require('express');
var app    		= express();
var bodyParser 	= require('body-parser');
var mongoose = require('mongoose');

var db      	= require('./models');


// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// serve static files in public
app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));
//Express loads the view module internally
//app.set('views', './views');
//var db = require('./models');

/*
 * HTML Endpoints
 */
app.get('/', function index(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.use(function(req, res, next) { // fixes allow origin permission error
	 res.header("Access-Control-Allow-Origin", "*");
	 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	 next();
	});

////////////////////
//  ROUTES
///////////////////

//Show all cards
app.get('/cards', function show(req,res){
	db.Card.find({}, function(err,cards){
		res.json(cards);
	});
});


app.get('/cards/:id', function show(req, res){	
	db.Card.findById({id: req.params.id})
	.exec(function(err, card){
		res.json(card);
	});
});

//Create a card
app.post('/cards', function(res, req) {
	var newCard = new db.Card({
			question: req.body.question
	});
//Save the new card
			newCard.save(function(err, card) {
				if(err) {
				return console.log('save error:' + err);
			}
			console.log('save ', card.question);
				res.end();
		});

});

app.delete('/cards/:id',function(req, res){
	var id = req.params.id;
	db.Card.findByIdAndRemove({_id: id}, function(err, cards){
		if (err) res.json(err);
		console.log("Removed " + id);
		res.json(cards);
	});
});



/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});