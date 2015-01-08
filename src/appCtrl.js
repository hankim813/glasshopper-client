angular.module('appCtrl', [])

.controller('AppController', function($scope, $location, $state, $stateParams, $ionicHistory, $localStorage, AuthenticationFactory, UserAuthFactory, SearchData) {

  $scope.bars;
  $scope.logout = UserAuthFactory.logout;
  // Validation to see if you have initialized the crawl
  $scope.crawlStarted = function() {
    return ($localStorage.currentCrawl !== undefined)
  };

  $scope.doSearch = function(place){
    SearchData.setCoords({ lat: place.geometry.location.k,
                           lng: place.geometry.location.D});
    $state.go("app.bars",{},{reload: true});
  };

  $scope.fetchCurrentCrawl = function() {
  	if ($localStorage.currentCrawl) {
  		$ionicHistory.nextViewOptions({
  		    disableAnimate  : false,
  		    disableBack     : true
  		});
      $state.go('app.currentCrawl', {crawlId: $localStorage.currentCrawl.id});
  	} else {
  		alert('Something went wrong. Please login again');
  		UserAuthFactory.logout();
  	}
  };
});

