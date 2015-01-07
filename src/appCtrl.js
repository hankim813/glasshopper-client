angular.module('appCtrl', [])

.controller('AppController', function($scope, $location, $state, $stateParams, $ionicHistory, $localStorage, AuthenticationFactory, UserAuthFactory) {

  $scope.bars;
  $scope.logout = UserAuthFactory.logout;
  console.log("LocalStorage: ", $localStorage);
  $scope.user = $localStorage.user;
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
      $state.go('app.currentCrawl', {crawlId: $localStorage.currentCrawl.id});
  		// $location.path('/app/crawls/' + $localStorage.currentCrawl.id);
  	} else {
  		alert('Something went wrong. Please login again');
  		UserAuthFactory.logout();
  	}
  };
});

