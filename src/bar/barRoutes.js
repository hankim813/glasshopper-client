angular.module('barRoutes', ['ionic', 'barModel', 'reviewModel', 'postFactories','geoModule'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.bars', {
    url     : "/bars",
    resolve : { bars : function(barFactory, geo) {
                    return geo.getPosition().then(function(position) {
                      var pos = {lat: position.coords.latitude,
                                 lng: position.coords.longitude};
                      return barFactory.findNearby(pos.lng, pos.lat, 0.25);
                    }, function(error) {
                      alert(JSON.stringify(error));
                    })
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