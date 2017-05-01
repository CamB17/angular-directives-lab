
var express 	= require('express');
var app    		= express();
var bodyParser 	= require('body-parser');
var db      	= require('./models');

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// serve static files in public
app.use(express.static('public'));

app.use(express.static(__dirname + '/public'));
//Express loads the view module internally
app.set('views', './views');
//var db = require('./models');



/*
 * HTML Endpoints
 */
app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/public/views/index.html');
});

////////////////////
//  ROUTES
///////////////////

app.get('/cards', function card_index(req,res) {
	console.log('Cards');
	db.Card.find()
	.populate ('album')
	.exec(function(err, card) {
		res.json(cards);
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
				res.json(card);
		});

});




/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});