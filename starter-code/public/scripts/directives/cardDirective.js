angular.module('CardsAgainstAssembly')
  .directive('wdiCard', wdiCard);

  function wdiCard(){
  	var directive = {
  		restrict: 'E',
  		replace: true,
  		templateUrl: "templates/cardDirective.html",
      //Add this link in instead https://shielded-forest-41789.herokuapp.com/api/flashcards
  			scope: {
  	// the question attribute is dropped into the template from html
  			question: '@'
  		}
  	};
  	return directive;
  }