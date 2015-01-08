angular.module('userSettingsCtrl', [])

.controller('SettingsController', ['$scope', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'settingsFactory', 'userSettings', function($scope, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, settingsFactory, userSettings){
	$scope.user = $localStorage.user;
	$scope.newSettings = {
		radiusDefinition : userSettings.data.searchRadius //grabbed from the server 
	};

	$scope.updateSettings = function(){
		settingsFactory.update($scope.newSettings, $scope.user.id)
		.success(updateSuccessCallback)
		.error(updateErrorCallback);
	};


  function updateSuccessCallback (data) {
    $localStorage.user.searchRadius = data.searchRadius;
  }

  function updateErrorCallback (data, status, headers, config) {
		console.log("Error Saving SearchRadius to server, defaulting to 0.25 mi radius");    
    $localStorage.user.searchRadius = 0.25;
  }

}]);
