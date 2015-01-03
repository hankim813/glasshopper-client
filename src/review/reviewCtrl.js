/**
* barCtrl Module
*/
angular.module('reviewCtrl', [])
.controller('ReviewController', ['$scope', '$ionicModal', '$http', '$location', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'ReviewFactory', function($scope, $ionicModal, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, ReviewFactory){
  $scope.Math      = window.Math;
  $scope.rawData   = {};
  $scope.review    = {};
  $scope.review.author = $localStorage.user.id;
  // $scope.review.barId = "";
  // $scope.$watch('review._bar', function(newValue, oldValue, scope) {
  //     scope.review._bar = newValue;
  // });


  $scope.createReview = function() {
    console.log($scope.rawData);
    console.log('review', $scope.review);
    ReviewFactory.create($scope.review)
      .success(reviewSuccessCallback)
      .error(reviewErrorCallback);
  };


  function reviewSuccessCallback (data) {
    $localStorage.token = data.token;
    ReviewFactory.isLogged = true;
    // AuthenticationFactory.isLogged = true;

    // $ionicHistory.nextViewOptions({
    //     disableBack: true
    // });
    // $scope.loginData = {};
    // $scope.profileData = {};
    $scope.review = {};

    console.log('local storage: ', $localStorage);
    $location.path("/app/playlists");
  }

  function reviewErrorCallback (data, status, headers, config) {
    // Erase the token if the user fails to log in
    // delete $localStorage.token;
    // delete $localStorage.user;
    // Handle login errors here
    console.log('data', data);
    console.log('headers', headers());
    alert(data.message);
  }


  //needs to happen before creation.
  //massages data from ranges and then stores them in review obj
  $scope.prepareStats = function (array, val) {
    var divisor = $scope.Math.floor(100/array.length);
    return $scope.Math.floor(val/divisor);
  };

  $scope.renderStats = function (stringArray, rangeValue) {
    var sd = $scope.prepareStats(stringArray, rangeValue);
    for(var i = 0; i < stringArray.length; i++){
      if(i === sd) {
        return stringArray[i];
      }
        // return stringArray[stringArray.length-1];

    }
    return stringArray[stringArray.length-1];
  };

  $scope.renderGgRatio = function (val) {
    return (val + ' girls : ' + (100-val) + ' guys');
  };
}]);