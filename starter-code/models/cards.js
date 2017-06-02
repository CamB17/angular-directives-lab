var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CardSchema = new Schema ({
	question: String
});

// card model
var Card = mongoose.model('Card', CardSchema);

// export
module.exports = Card;