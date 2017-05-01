//var mongoose = require('mongoose');
var db = require('./models');

var questionsList = [
    {question: "What is Batman's guilty pleasure?"},
    {question: "I'm sorry professor, I couldn't complete my homework because _________."},
    {question: "I get by with a little help from _________."},
    {question: "_________. It's a trap!"},
    {question: "The class field trip was completely ruined by _________."},
    {question: "What's my secret power?"}
  ];

//Remove a card
db.Card.remove({}, function(err,cards){
    db.Card.create(questionsList, function(err,cards){
        if (err) { return console.log('ERROR', err); }
        console.log('create', cards);
        process.exit();
    });
});