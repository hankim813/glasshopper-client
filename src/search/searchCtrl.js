angular.module('searchModule', [])

.controller('SearchController', function ($scope, $http, $location, $ionicHistory, $localStorage, $state, barFactory, SearchData) {


  $scope.details = function(place){
    SearchData.setCoords({ lat: place.geometry.location.k,
                           lng: place.geometry.location.D});
    $state.go("app.bars");
  };

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