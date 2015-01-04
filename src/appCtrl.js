angular.module('appCtrl', [])

.controller('AppController', function($scope, $location, $ionicHistory, AuthenticationFactory, UserAuthFactory) {

  $scope.logout = UserAuthFactory.logout;
});

