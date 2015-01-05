angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).

controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, checkinFactory, bar, posts){

  $scope.bar = bar;
  $scope.posts = posts.data;


//  $scope.reviews = reviews;
  //console.log('Reviews:', reviews);

  $scope.selectTab = function(index){
    $ionicTabsDelegate.select(index);
  };
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

  // Temporary Check In, to get other features working
  $scope.checkInToBar = function() {
    checkinFactory.create({
      userId: $localStorage.user.id,
      barId: $scope.bar._id
    }).then(function(response) {
      var checkin = {
        barId     : response.data._bar,
        userId    : response.data._user,
        timestamp : response.data.createdAt
      }
      $localStorage.lastCheckin = checkin;
    }, function(error) {
      console.log(error);
    });
  };

  // Voting feature
  $scope.upvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/up/" + postId);
  };

  $scope.downvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/down/" + postId);
  };
});
