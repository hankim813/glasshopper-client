angular.module('reviewCtrl', [])
.controller('ReviewController', ['$scope', '$ionicModal', '$http', '$location', '$localStorage', '$ionicHistory', '$cordovaOauth', '$ionicLoading', 'reviewFactory', function($scope, $ionicModal, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, reviewFactory){

  $scope.Math           = window.Math;
  $scope.rawData = { 
    crowdLevel : 1,
    noiseLevel : 1,
    avgAge     : 1 
  };

  $scope.review         = {};
  $scope.review.author  = $localStorage.user.id;


  $scope.createReview   = function() {
    prepareStats();

    reviewFactory.create($scope.review)
      .success(reviewSuccessCallback)
      .error(reviewErrorCallback);
  };


  function reviewSuccessCallback (data) {
    $scope.review = {};
  }

  function reviewErrorCallback (data, status, headers, config) {
    alert(data.message);
  }

  //needs to happen before creation.
  //massages data from ranges and then stores them in review obj
  function prepareStats () {
    $scope.review.crowdLevel  = rangeConverter($scope.rawData.crowdLevel);
    $scope.review.noiseLevel  = rangeConverter($scope.rawData.noiseLevel);
    $scope.review.avgAge      = rangeConverter($scope.rawData.avgAge);
    $scope.review.ggRatio     = parseInt($scope.rawData.ggRatio);
  };

  function rangeConverter (val) {
    return ($scope.Math.floor(val/33) + 1);
  };

  $scope.renderAgeRange = function (val) {
    if($scope.rawData.avgAge <= 40 && $scope.rawData.avgAge > 20){
      return '26-30';
    }else if($scope.rawData.avgAge <= 60 && $scope.rawData.avgAge > 40){
      return '31-40';
    }else if($scope.rawData.avgAge <= 80 && $scope.rawData.avgAge > 60){
      return '40-50';
    }else if($scope.rawData.avgAge <= 100 && $scope.rawData.avgAge > 80){
      return '50+';
    }else { return '21-25'; }
  };

  $scope.renderGgRatio = function (val) {
    if(val >= 0 && val <= 100) {
      return (val + ' girls : ' + (100-val) + ' guys');
    } else { 
      return (50 + ' girls : ' + (100-50) + ' guys'); 
    }
  };

  
  // CROWD BUTTONS
  $scope.active ='dead';
  $scope.setActive = function(type){
    console.log("Setting to type: ", type);
    $scope.active = type;
  };

  $scope.isActive = function(type) {

    return type === $scope.active;
  };
}]);