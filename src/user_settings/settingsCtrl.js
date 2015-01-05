angular.module('userSettingsCtrl', [])

.controller('SettingsController', ['$scope', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'settingsFactory', function($scope, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, settingsFactory){
	$scope.user = $localStorage.user;
	$scope.newSettings = {
		radiusDefinition : $scope.user.searchRadius
	};

	$scope.updateSettings = function(){
		settingsFactory.update($scope.newSettings, $scope.user.id)
		.success(updateSuccessCallback)
		.error(updateErrorCallback);
	};


  function updateSuccessCallback (data) {
  };

  function updateErrorCallback (data, status, headers, config) {
    alert(data.message);
  };

}]);