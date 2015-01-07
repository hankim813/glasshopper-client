angular.module('searchModule', [])

.controller('SearchController', function ($scope, $http, $location, $ionicHistory, $localStorage, BarService, barFactory) {


  $scope.bars = BarService.bars;

  $scope.details = function(poop){
    barFactory.findNearby(poop.geometry.location.D, poop.geometry.location.k, 0.25).then(function(response) {
            $scope.bars = response.data;
          }, function(error) {
            console.log(error);
          });
    console.log('callb poop ', poop.geometry);
  };


  window.scope = $scope;


})

.config( function( $stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.search', {
    url     : "/search",
    views   : {
      'menuContent': {
        templateUrl: "search/search.tpl.html",
        controller: 'SearchController'
      }
    }
  })

})

.run(['$templateCache', function ($templateCache) {
  $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
  $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
}])