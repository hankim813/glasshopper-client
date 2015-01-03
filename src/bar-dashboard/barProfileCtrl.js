angular.module('barDashCtrl', [])

.controller('barDashController', function($scope, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, UserAuthFactory, AuthenticationFactory, UserProfileFactory){
	//for now, we use stub data
	$scope.bar = {
		name: "neil's bar"
	}

});
