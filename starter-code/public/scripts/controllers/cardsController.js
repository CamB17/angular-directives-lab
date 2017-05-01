var app = angular.module('CardsAgainstAssembly')
  .controller('CardsController', CardsController);

CardsController.$inject = ['$http'];

function CardsController($http) {
  console.log('cards cont');
//CardsController.$inject = ['$resources'];
  var self = this;
  self.all = [];
  self.newCard = {};
  self.deleteCard = deleteCard;
  self.updateCard = updateCard;

//Setup get function
function getCards(){
  $http
    .get('http://localhost:3000/api/cards')      
    .then(function(response){
        console.log(response);
        self.all = response.data;
      });
  }
  getCards(); //call the function

//Add card function
function addCard(){
  $http
    .post('http://localhost:3000/api/cards', self.newCard)
    .then(function(response){
        getCards(); //retrieves updated card list
      });
    self.newCard = {}; //resets form
}

//Delete a card function
function deleteCard(card){
  console.log(Card);
  $http
    .delete('http://localhost:3000/api/cards/', + card._id)
    .then(function(response){
      console.log(response);
      var index = self.all.indexOf(card);
      self.all.splice(index, 1);
    });
    getCards();
}

//Update card
function updateCard(card){
  console.log(addCard);
  $http
    .put('http://localhost:3000/api/cards/', + card._id)
    .then(function(response){
      console.log(response);
      card.question = question;
      getCards();
      });
  }



















}
