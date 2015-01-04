angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).

controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, bar){

  $scope.bar = bar;

  console.log('Bar:',bar);

  $scope.selectTab = function(index){
    $ionicTabsDelegate.select(index);
  };

  // Review Modal
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

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});
