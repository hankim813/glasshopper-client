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
      $scope.rawData        = {};
      $scope.review         = {};
      $scope.review.author  = $localStorage.user.id;
      $scope.review.bar     = $scope.bar._id;

      $scope.activeAge      ='';
      $scope.activeCrowd    ='';
      $scope.submissionText = 'Submit';

      var math              = window.Math;
      var review            = $scope.review;
      var rawData           = $scope.rawData;
      var toggleBool        = true;


      // Toggle submission from Create Review to Update Review
      $scope.formSubmission = function () {
        if(toggleBool) {
          toggleBool = !toggleBool;
          $scope.submissionText = 'Update Review';
          createReview();
          // getAggs();
        } else {
          updateReview();
          // getAggs();
        }

        // $scope.apply();
      };

      //Get Aggregates
      // function getAggs () {
      //   reviewFactory.fetchAggregate(review.bar)
      //     .success(function (data) {
      //       console.log('review controller - reviews get route:', data);
      //       $scope.aggregates = data[0];
      //     })
      //     .error(function (data) {
      //       alert(data.message);
      //     });
      // }

      // Create Review
      function createReview () {
        prepareStats();

        reviewFactory.create(review.bar, review)
          .success(reviewSuccessCallback)
          .error(reviewErrorCallback);
      }

      // Create Review success callback
      function reviewSuccessCallback (data) {
        review.id      = data._id;
        review.author  = $localStorage.user.id;
        $scope.review.bar     = $scope.bar._id;
      }

      // Create Review error callback
      function reviewErrorCallback (data, status, headers, config) {
        alert(data.message);
      }

      // Update Review
      function updateReview () {
        prepareStats();

        reviewFactory.update(review.bar, review.id, review)
          .success(reviewUpdateSuccess)
          .error(reviewUpdateError);
      }

      // Converts raw noise level to 1-4.
      // Converts ggRatio string into an Integer
      function prepareStats () {
        review.noiseLevel  = rangeConverter(rawData.noiseLevel);
        review.ggRatio     = parseInt(rawData.ggRatio);
      }

      // Turns 0-100 into 1-4
      function rangeConverter (val) {
        return (math.floor(val/33) + 1);
      }

      // Update Review success callback
      function reviewUpdateSuccess (data) {
        review.author  = $localStorage.user.id;
        review.bar     = $scope.bar._id;
      }

      // Update Review error callback
      function reviewUpdateError (data, status, headers, config) {
        alert(data.message);
      }


      // Set Active Button
      $scope.setActive = function(type){
        if (typeof type == 'string') {
          setCrowdValue(type);
          $scope.activeCrowd = type;
        } else {
          setAvgAgeValue(type);
          $scope.activeAge = type;
        }
      };

      // Returns true if button is active
      $scope.isCrowdActive = function (type) {
        return type === $scope.activeCrowd;
      };

      // Returns true if button is active
      $scope.isAgeActive = function(type) {
        return type === $scope.activeAge;
      };

      // Buttons are invalid if no active button is chosen
      $scope.buttonInvalid = function () {
        return $scope.activeCrowd === '' || $scope.activeAge === '';
      };


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