angular.module('appCtrl', [])

.controller('AppController', function($scope, $location, $ionicHistory, $localStorage, AuthenticationFactory, UserAuthFactory) {

  $scope.logout = UserAuthFactory.logout;
  // Validation to see if you have initialized the crawl

  $scope.crawlStarted = function() {
    return ($localStorage.currentCrawl !== undefined)
  };

  $scope.fetchCurrentCrawl = function() {
  	if ($localStorage.currentCrawl) {
  		$ionicHistory.nextViewOptions({
  		    disableAnimate  : false,
  		    disableBack     : true
  		});
  		$location.path('/app/crawls/' + $localStorage.currentCrawl.id);
  	} else {
  		alert('Something went wrong. Please login again');
  		UserAuthFactory.logout();
  	}
  };
});

