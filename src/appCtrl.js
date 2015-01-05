angular.module('appCtrl', [])

.controller('AppController', function($scope, $location, $ionicHistory, $localStorage, AuthenticationFactory, UserAuthFactory) {

  $scope.logout = UserAuthFactory.logout;
  // Validation to see if you have initialized the crawl

  $scope.currentCrawlUrl = function(){
    if ($localStorage.currentCrawl) {
      return $localStorage.currentCrawl.id;
    } else {
      return "#";
    };
  }

  $scope.crawlStarted = function() {
    return ($localStorage.currentCrawl !== undefined)
  };
});

