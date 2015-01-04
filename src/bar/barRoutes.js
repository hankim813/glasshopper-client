angular.module('barRoutes', ['ionic', 'barModel', 'reviewModel'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.bars', {
    url     : "/bars",
    resolve : { bars : function(barFactory) {
                  return barFactory.findNearby(-122.396892, 37.785449, 0.15);
                }
              },
    views   : {
      'menuContent': {
        templateUrl: "bar/bars.tpl.html",
        controller: 'BarController'
      }
    }
  })
  .state('app.barshow', {
    url     : "/bars/:barId",
    resolve : { bar : function(barFactory, $stateParams) {
                  return barFactory.get($stateParams.barId);
                }
              },
    views   : {
      'menuContent': {
        templateUrl: "bar/bar.tpl.html",
        controller: 'BarSingleController'
      }
    }
  });

});