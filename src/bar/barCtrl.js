angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).

controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, bar){

  $scope.bar = bar;


//  $scope.reviews = reviews;

  console.log('Bar:',bar);
  //console.log('Reviews:', reviews);

  $scope.selectTab = function(index){
    $ionicTabsDelegate.select(index);
  };
  // Create the review modal
  $ionicModal.fromTemplateUrl('review/review.tpl.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.reviewBar = function() {
    $scope.modal.show();

    $ionicSlideBoxDelegate.update();
  };

  $scope.closeReview = function() {
    $scope.modal.hide();
  };


  // Call this functions if you need to manually control the slides
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  };

  $scope.previousSlide = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});
