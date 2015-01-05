angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).

controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, bar, posts){

  $scope.bar = bar;
  $scope.posts = posts.data;

  $scope.aggregates = {
      avgCrowd: 3,
      avgAge: 4,
      ggRatio: 55,
      avgNoise: 3,
  };

  $scope.selectTab = function(index){
    $ionicTabsDelegate.select(index);
    console.log('index', index);
  };

  $scope.onReviewSubmit = function() {
    $scope.selectTab(0);
    $scope.closeReview();
  };

  // Review Modal
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

  // Temporary Check In, to get other features working
  $scope.checkInToBar = function() {
    $localStorage.barId = bar._id;
  };

  // Voting feature
  $scope.upvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/up/" + postId);
  };

  $scope.downvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/down/" + postId);
  };
});
