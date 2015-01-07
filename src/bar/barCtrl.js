angular.module('barCtrl', ['ionic']).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, geo, userSettings){

  $scope.bars;
  // $scope.bars = AppController.BarService

  (function(geo) {
        $ionicLoading.show();
        geo.getPosition().then(function(position) {
          var pos = {lat: position.coords.latitude,
                     lng: position.coords.longitude};
         $ionicLoading.hide();
          barFactory.findNearby(pos.lng, pos.lat, userSettings.data.searchRadius).then(function(response) {
            $scope.bars = response.data;
          }, function(error) {
            console.log(error);
          });
        }, function(error) {
          alert(JSON.stringify(error));
        });
    })(geo);
})

.controller('BarMapController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, uiGmapGoogleMapApi, $window, barFactory, geo, userSettings){

  $scope.window = $window;
  $scope.bars = [];

  (function(geo) {
        $ionicLoading.show();
        geo.getPosition().then(function(position) {
          var pos = {latitude: position.coords.latitude,
                     longitude: position.coords.longitude};
         $ionicLoading.hide();
          barFactory.findNearby(pos.longitude, pos.latitude, userSettings.data.searchRadius).then(function(response) {
            $scope.bars = thaiMassageBars(response.data);
          }, function(error) {
            console.log(error);
          });
        }, function(error) {
          alert(JSON.stringify(error));
        })
    })(geo);

function thaiMassageBars (bars) {
  var result = [];
  for (var i = bars.length - 1; i >= 0; i--) {
    result.unshift(shoveIntoArray(bars[i].obj));
  };
  return result;
}

function shoveIntoArray (bar) {
    var ret = bar;
    var location = ret.loc;
    ret.loc = {longitude : location[0],
               latitude  : location[1] };
    ret.onClick = function() {
                ret.show = !ret.show;
                console.log(ret.name);
                console.log("Clicked!");
              };
    ret.show = false;
  return ret;
}

  $scope.mapOptions = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  // uiGmapGoogleMapApi.then(function(maps) {
  //   console.log(maps);
  // });

})

.controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, checkinFactory, reviewFactory, postFactory, bar, posts, aggregate){

  $scope.bar = bar;
  $scope.posts = posts.data;
  $scope.aggregates = aggregate.data[0];
  $scope.reviewButtonText = '';



  // refreshes dashboard information
  $scope.updateDash = function() {
    reviewFactory.fetchAggregate($scope.bar._id)
      .success(function (data) {
        $scope.aggregates = data[0];
      })
      .error(function (data) {
        alert(data.message);
      });

    postFactory.getAll($scope.bar._id)
      .success(function (data) {
        $scope.posts = data;
      })
      .error(function (data) {
        alert(data.message);
      });

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
  }

  // Validation to see if you have initialized the crawl
  function crawlStarted() {
    return ($localStorage.currentCrawl !== undefined);
  }

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





















  //--------------- POST CONTROLLER START ----------------------
  $scope.postData     = {
    barId: $scope.bar._id,
    userId: $localStorage.user.id
  };

  //creates post and closes post modal
  $scope.onPostSubmit = function () {
    $scope.uploadPost();
    $scope.closePostModal();
  };

  // makes request to POST route
  $scope.uploadPost   = function(){
    postFactory.create($scope.postData, $scope.bar._id)
      .success(postSuccessCallBack)
      .error(postErrorCallback);
  };

  // makes request to GET route
  function getPosts () {
    postFactory.getAll($scope.bar._id)
      .success(function (data) {
        $scope.posts  = data;
      })
      .error(function (data) {
        alert(data.message);
      });
  }

  // Successful response from POST route stores bar and user
  // and makes a request to the GET route (for live update)
  function postSuccessCallBack(result){
    $scope.postData   = {
      barId: $scope.bar._id,
      userId: $localStorage.user.id
    };
    getPosts();
  }

  // Post Error  Callback
  function postErrorCallback (error) {
    alert('error');
  }


























  //--------------- REVIEW START ----------------------
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

  // Submit review, close modal, and set tab index to 0
  $scope.onReviewSubmit = function() {
    $scope.formSubmissionToggle();
    $scope.closeReview();
    $scope.selectTab(0);
  };


  // Toggle submission from Create Review to Update Review
  $scope.formSubmissionToggle = function () {
    if(toggleBool) {
      toggleBool = !toggleBool;
      $scope.submissionText = 'Update Review';
      createReview();
    } else {
      updateReview();
    }
  };

  //Get Aggregates
  function getAggs () {
    reviewFactory.fetchAggregate(review.bar)
      .success(function (data) {
        console.log('review controller - reviews get route:', data);
        $scope.aggregates = data[0];
      })
      .error(function (data) {
        alert(data.message);
      });
  }

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

    getAggs();
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
    getAggs();
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


});
