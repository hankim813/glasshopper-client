angular.module('barRoutes', ['ionic', 'barModel', 'reviewModel', 'postFactories','geoModule', 'settingsModel'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.bars', {
    url     : "/bars",
    cache   : false,
    views   : {
      'menuContent': {
        templateUrl: "bar/bars.tpl.html",
        controller: 'BarController'
      }
    }
  })

  .state('app.barsMap', {
    url     : "/bars/map",
    views   : {
      'menuContent': {
        templateUrl: "bar/barsMap.tpl.html",
        controller: 'BarMapController'
      }
    }
  })

  .state('app.barshow', {
    cache   : false,
    url     : "/bars/:barId/:distance",
    resolve : { bar       : function(barFactory, $stateParams) {
                  return barFactory.get($stateParams.barId);
                },
                posts     : function(postFactory, $stateParams) {
                  return postFactory.getAll($stateParams.barId);
                },
                aggregate : function (reviewFactory, $stateParams) {
                  return reviewFactory.fetchAggregate($stateParams.barId);
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