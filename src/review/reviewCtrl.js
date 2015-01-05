angular.module('reviewCtrl', [])
.controller('ReviewController', ['$scope',
                                 '$ionicModal',
                                 '$http',
                                 '$location',
                                 '$localStorage',
                                 '$ionicHistory',
                                 '$cordovaOauth',
                                 '$ionicLoading',
                                 'reviewFactory',

    function($scope, $ionicModal, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, reviewFactory){
      $scope.Math           = window.Math;
      $scope.rawData        = {};
      $scope.review         = {};
      $scope.review.author  = $localStorage.user.id;
      $scope.review.bar     = $scope.bar._id;
      $scope.activeAge      ='';
      $scope.activeCrowd    ='';
      var review = $scope.review;
      var rawData = $scope.rawData;

      $scope.createReview   = function() {
        prepareStats();

        reviewFactory.create(
          review)
          .success(reviewSuccessCallback)
          .error(reviewErrorCallback);
      };

      // BUTTONS
      $scope.setActive = function(type){
        if (typeof type == 'string') {
          setCrowdValue(type);
          $scope.activeCrowd = type;
        } else {
          setAvgAgeValue(type);
          $scope.activeAge = type;
        }
      };

      $scope.isCrowdActive = function (type) {
        return type === $scope.activeCrowd;
      };

      $scope.isAgeActive = function(type) {
        return type === $scope.activeAge;
      };

      $scope.buttonInvalid = function () {
        return $scope.activeCrowd === '' || $scope.activeAge === '';
      };


      function reviewSuccessCallback (data) {
        $scope.review = {};
        $scope.rawData = {};
        $scope.activeAge = '';
        $scope.activeCrowd = '';
        $scope.review.author  = $localStorage.user.id;
        $scope.review.bar     = $scope.bar._id;
      }

      function reviewErrorCallback (data, status, headers, config) {
        if(status === 404) {
          $scope.review = {};
          $scope.rawData = {};
          $scope.activeAge = '';
          $scope.activeCrowd = '';
          $scope.review.author  = $localStorage.user.id;
          $scope.review.bar     = $scope.bar._id;
        }
        alert(data.message);
      }


      function prepareStats () {
        review.noiseLevel  = rangeConverter(rawData.noiseLevel);
        review.ggRatio     = parseInt(rawData.ggRatio);
      }

      function rangeConverter (val) {
        return ($scope.Math.floor(val/33) + 1);
      }


      //AvgAge Button Data Values
      function setAvgAgeValue (name) {
        review.avgAge = name;
      }


      //CROWD Button Data Values
      function setCrowdValue (name) {
        switch(name) {
          case 'dead':
            review.crowdLevel = 1;
            break;
          case 'ok':
            review.crowdLevel = 2;
            break;
          case 'poppin':
            review.crowdLevel = 3;
            break;
          case 'ugh':
            review.crowdLevel = 4;
            break;
          default:
            review.crowdLevel = 1;
            break;
        }
      }
}]);