angular.module('barCtrl', ['ionic']).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, geo){

  $scope.bars;

  (function(geo) {
        $ionicLoading.show();
        geo.getPosition().then(function(position) {
          var pos = {lat: position.coords.latitude,
                     lng: position.coords.longitude};
         $ionicLoading.hide();
          barFactory.findNearby(pos.lng, pos.lat, 0.25).then(function(response) {
            $scope.bars = response.data;
          }, function(error) {
            console.log(error);
          });
        }, function(error) {
          alert(JSON.stringify(error));
        })
    })(geo);

}).


controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, checkinFactory, reviewFactory, bar, posts, aggregate){

  $scope.bar = bar;
  $scope.posts = posts.data;
  $scope.aggregates = aggregate.data[0];

  $scope.updateReviews = function() {
    reviewFactory.fetchAggregate($scope.bar._id)
      .success(function (data) {
        $scope.aggregates = data[0];
      })
      .error(function (data) { alert(data.message); });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };

  // Sets active tab
  $scope.selectTab = function(index){
    $ionicTabsDelegate.select(index);
  };

  // Review Modal
  $ionicModal.fromTemplateUrl('review/review.tpl.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.reviewModal = modal;
  });

  $scope.onReviewSubmit = function() {
    $scope.selectTab(0);
    $scope.closeReview();
  };

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

  // Validation that will be used to see if you can interact with the activity feed or not

  $scope.ifCheckedIn = function() {
    return ($localStorage.lastCheckin.barId === bar._id);
  };

  // Validation that will be used to see if you can check in 
  $scope.AllowedToCheckIn = function() {
    // the "checkin" button should be enabled if you are:
    // 1) geolocation authenticated to be nearby
    // 2) if you have initialized the bar crawl.
    // If you are nearby but haven't yet initialized a crawl, you can still checkin, we will initialize a crawl, and insert that bar into the crawl for you for better ux experience. 
    return ifNearby();
  };

  // Validate current loc with bar's loc
  function ifNearby() {
    // ping location 
    // if loc matches bar loc, execute crawlStarted(), and handle logic thereafter
    // return boolean value
  };

  // Validation to see if you have initialized the crawl
  function crawlStarted() {
    return ($localStorage.currentCrawl !== undefined)
  };

  // Check In Feature
  $scope.checkInToBar = function() {
    checkinFactory.create({
      userId: $localStorage.user.id,
      barId: $scope.bar._id
    }).then(function(response) {
      var checkin = {
        barId     : response.data._bar,
        userId    : response.data._user,
        timestamp : response.data.createdAt
      };
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
