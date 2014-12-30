angular.module('loginCtrl', [])

.controller('LoginController', function($scope, $http, $location, $localStorage, $ionicHistory, UserAuthFactory, AuthenticationFactory) {

  // Form data for the login modal
  $scope.loginData = {};

  $scope.createUser = function() {
    $http
      .post('http://127.0.0.1:3000/api/signup', $scope.loginData)
      .success(authSuccessCallback)
      .error(authErrorCallback);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    UserAuthFactory.login($scope.loginData)

    .success(authSuccessCallback)
    .error(authErrorCallback);
  };


  function authSuccessCallback (data) {
    $localStorage.token = data.token;
    $localStorage.user = data.user;
    AuthenticationFactory.isLogged = true;
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
    $scope.loginData = {};
    $location.path("/app/playlists");
  }

  function authErrorCallback (data, status, headers, config) {
    // Erase the token if the user fails to log in
    delete $localStorage.token;
    delete $localStorage.user;
    // Handle login errors here

    $scope.message = data.message;
  }
});