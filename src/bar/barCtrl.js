angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).

controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, bar){
  $scope.bar = bar;

  // Create the review modal
  $ionicModal.fromTemplateUrl('review/review.tpl.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reviewModal = modal;
  });

  $scope.reviewBar = function() {
    $scope.reviewModal.show();
  };

  $scope.closeReview = function() {
    $scope.reviewModal.hide();
  };

  // Create the post modal
  $ionicModal.fromTemplateUrl('post/post-form.tpl.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.postModal = modal;
  });

  $scope.openPostModal = function() {
    $scope.postModal.show();
  };

  $scope.closePostModal = function() {
    $scope.postModal.hide();
  };
});
