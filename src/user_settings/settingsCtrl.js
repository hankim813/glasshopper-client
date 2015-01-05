angular.module('userSettingsCtrl', [])

.controller('SettingsController', ['$scope', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', function($scope, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, user){
	$scope.user = $localStorage.user;
	$scope.radiusDefinition = $localStorage.user.searchRadius;


}]);