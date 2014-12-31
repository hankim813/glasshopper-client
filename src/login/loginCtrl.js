angular.module('loginCtrl', [])

.controller('LoginController', function($scope, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, UserAuthFactory, AuthenticationFactory, UserProfileFactory) {

  // Form data for the login modal
  $scope.loginData = {};
  $scope.profileData = {};

  $scope.createUser = function() {
    UserProfileFactory.create($scope.profileData)
      .success(authSuccessCallback)
      .error(authErrorCallback);
  };

  $scope.fbCallback = function() {
    UserProfileFactory.fbCallback($scope.profileData)
      .success(authSuccessCallback)
      .error(authErrorCallback);
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    UserAuthFactory.login($scope.loginData)
      .success(authSuccessCallback)
      .error(authErrorCallback);
  };

  $scope.facebookLogin = function() {
    console.log("in the function")
      $cordovaOauth.facebook("196511150372923", ["public_profile", "email"]).then(fbSuccessCallback, fbErrorCallback);
  }

  function fbSuccessCallback (result) {
    $localStorage.fbToken              = result.access_token;

    $ionicLoading.show();

    UserProfileFactory.getFacbookProfile();

    $scope.profileData.profilePhotoUrl = $localStorage.profilePhotoUrl;
    $scope.profileData.facebook        = $localStorage.facebook;
    $scope.profileData.facebook.token  = $localStorage.fbToken;

    $scope.fbCallback();
    $ionicLoading.hide();
  }

  function fbErrorCallback (error) {
    alert(error);
  }

  function authSuccessCallback (data) {
    $localStorage.token = data.token;
    $localStorage.user = data.user;
    AuthenticationFactory.isLogged = true;
    $ionicHistory.nextViewOptions({
        disableBack: true
    });
    $scope.loginData = {};
    $scope.profileData = {};
    $location.path("/app/playlists");
  }

  function authErrorCallback (data, status, headers, config) {
    // Erase the token if the user fails to log in
    delete $localStorage.token;
    delete $localStorage.user;
    // Handle login errors here

    alert(data.message);
  }
});