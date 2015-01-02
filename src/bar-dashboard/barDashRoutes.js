angular.module('barRoutes', ['ionic', 'barModel'])

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
        templateUrl: "bar-dashboard/barView.tpl.html",
        controller: 'barDashController'
      }
    }
  })

});