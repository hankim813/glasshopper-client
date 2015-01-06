angular.module('userSettingsCtrl', [])

.controller('SettingsController', ['$scope', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'settingsFactory', 'userSettings', function($scope, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, settingsFactory, userSettings){
	$scope.user = $localStorage.user;
	$scope.newSettings = {
		radiusDefinition : userSettings.data.searchRadius || 0.1//grabbed from the server 
	};
	console.log("User: ",$scope.user);
	$scope.updateSettings = function() {
		console.log("newSettings", $scope.newSettings);
		settingsFactory.update($scope.newSettings, $scope.user.id)
		.success(updateSuccessCallback)
		.error(updateErrorCallback);
	};


  function updateSuccessCallback (data) {
  	console.log("data", data);
  };

  function updateErrorCallback (data, status, headers, config) {
    alert(data.message);
  };

}]);