angular.module('CardsAgainstAssembly')
  .directive('wdiCard', wdiCard);

  function wdiCard(){
    // directive to return a object
    let directive = {
      // defining what to use for the directive in HTML
      restrict: 'E',
      // if it replaces a HTML element or not from the template
      replace: true,
      // template or file for template to build html
      templateUrl: 'templates/cardDirective.html',
      // scope for directive
      scope: {
        // question returned as a string
        question: '@',
        id: '@'
      }
    };
    return directive;
  }
