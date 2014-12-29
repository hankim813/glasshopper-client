angular.module('loginCtrl', [])

.controller('LoginController', function($scope, $http, $localStorage) {
  // Form data for the login modal
  $scope.loginData = {};

  $scope.createUser = function() {
    console.log('Doing register', $scope.loginData);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('hello Han')
    $http
      .post('http://127.0.0.1:3000/api/signin', $scope.loginData)
      .success(function (data, status, headers, config) {
        $localStorage.token = data.token;
        $localStorage.user = data.user;
        console.log('logged in');
        console.log($localStorage.user);
        console.log($localStorage.token);
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        delete $localStorage.token;
        delete $localStorage.user;
        console.log('error!');
        // Handle login errors here
        $scope.message = data.message;
      });
  };
});