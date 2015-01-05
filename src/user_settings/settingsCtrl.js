angular.module('userSettingsCtrl', [])

.controller('SettingsController', ['$scope', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'settingsFactory', function($scope, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, settingsFactory){
	$scope.user = $localStorage.user;
	$scope.newSettings = {
		radiusDefinition : $scope.user.searchRadius
	};

	$scope.updateSettings = function(){
		settingsFactory.update($scope.newSettings, $scope.user.id)
		.success(successCallback)
		.error(errorCallback);
	}


  function successCallback (data) {
    console.log("successCallback: ", data);
    // Should refresh the review averages
  }

  function errorCallback (data, status, headers, config) {
    alert(data.message);
  }



}]);