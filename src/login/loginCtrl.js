angular.module('loginCtrl', [])

.controller('LoginController', function($scope, $http, $location, $localStorage, $ionicHistory, UserAuthFactory, AuthenticationFactory) {

  if(AuthenticationFactory.isLogged) {
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
    $location.path("/app/playlists");
  }
  // Form data for the login modal
  $scope.loginData = {};

  $scope.createUser = function() {
    $http
      .post('http://127.0.0.1:3000/api/signup', $scope.loginData)
      .success(function (data, status, headers, config) {
        console.log("oh yeesssss")
        $localStorage.token = data.token;
        $localStorage.user = data.user;
      })
      .error(function (data, status, headers, config) {
        // Erase the token if the user fails to log in
        console.log("oh nooooo")
        delete $localStorage.token;
        delete $localStorage.user;
        // Handle login errors here
        $scope.message = data.message;
      });
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    UserAuthFactory.login($scope.loginData)

    .success(function (data) {
      $localStorage.token = data.token;
      $localStorage.user = data.user;
      AuthenticationFactory.isLogged = true;
      $location.path("/app/playlists");
    })

    .error(function (data, status, headers, config) {
      // Erase the token if the user fails to log in
      delete $localStorage.token;
      delete $localStorage.user;
      // Handle login errors here

      $scope.message = data.message;
    });
  }
});