angular.module('login', [])

.controller('LoginCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};
  $scope.formTitle = 'Login';
  $scope.functionName = 'doLogin()';
  $scope.changeFormToRegister = function() {
    $scope.formTitle = "Register";
    $scope.functionName =  "createUser()";
  };

  $scope.changeFormToLogin = function() {
    $scope.formTitle = "Login";
    $scope.functionName = 'doLogin()';
  };

  $scope.createUser = function() {
    console.log('Doing register', $scope.loginData);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
});