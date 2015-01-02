angular.module('barCtrl', [])

.controller('barController', function($scope, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, UserAuthFactory, AuthenticationFactory, UserProfileFactory, BarDashboardFactory){
	//for now, we use stub data
	$scope.bar = BarDashboardFactory.get(0) //grab the first fake bar

	


});
