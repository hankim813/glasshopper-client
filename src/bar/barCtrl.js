angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){
  
  $scope.bars = bars;

}).
controller('BarSingleController', function($scope, $ionicModal, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bar){
  console.log($scope);

  $scope.bar = bar;


  // Create the review modal
  $ionicModal.fromTemplateUrl('review/review.tpl.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.reviewBar = function() {
    $scope.modal.show();
  };

  $scope.closeReview = function() {
    $scope.modal.hide();
  };
});