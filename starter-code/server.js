var express = require('express');
var app = express();
router = express.Router();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// public views
app.use(express.static(__dirname + '/public'));

// HTML Endpoint
app.get('/', function home(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

// Hard coded Data
var cards = [
    {question: "What is Batman's guilty pleasure?"},
    {question: "I'm sorry professor, I couldn't complete my homework because _________."},
    {question: "I get by with a little help from _________."},
    {question: "_________. It's a trap!"},
    {question: "The class field trip was completely ruined by _________."},
    {question: "What's my secret power?"}
  ];

// DB ROUTES
// Require DB models
let db = require('./models');

// GET
app.get('/cards', (req,res)=>{
	db.Card.find()
	.exec((err, cards) => {
		if (err){
			console.log("Get error: ",err);
		}
		res.json(cards);
	});
});

// SHOW
app.get('/cards/:id', (req,res)=>{
	db.Card.findOne({_id: req.params.id}, (err, data) =>{
		if (err){
			console.log("Show error: ",err);
		}
		res.json(data);
	});
});

// POST
app.post('/cards', (req,res)=>{
	var newCard = new db.Card({
		question: req.body.question
	});
	newCard.save((err,card) =>{
		if (err){
			console.log("Save Error: ", err);
		}
		res.json(card);
	});
});

// DELETE
app.delete('/cards/:id', (req,res)=>{
	var cardId = req.params.id;
	db.Card.findOneAndRemove({_id: cardId}, (err, deletedCard)=>{
		if (err){
			console.log('Delete Error: ', err);
		}
		res.json(deletedCard);
	});
});

// PUT
app.put('/cards/:id', (req,res)=>{
	// console.log(req);
	var cardId = req.params.id;
	db.Card.findOne({_id: cardId}, (err, foundCard)=>{
		if (err){
			console.log('Update error: ', err);
		}
		console.log(foundCard);
		console.log(req.body);
		foundCard.id = cardId;
		foundCard.question = req.body.question;
		foundCard.save((err, card)=>{
			if (err){
				console.log("Update Save Error: ", err);
			}
			console.log("Updated ", card.question);
		 res.json(card);
		});
	});
});

// server
app.listen(3000, () => {
	console.log('Server running on PORT 3000');
});