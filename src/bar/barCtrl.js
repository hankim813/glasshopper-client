angular.module('barCtrl', ['ionic']).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, geo, SearchData){


  (function(geo) {
        if (SearchData.getCoords()) {
            barFactory.findNearby(SearchData.getCoords().lng, SearchData.getCoords().lat, $localStorage.user.searchRadius).then(function(response) {
              $scope.bars = response.data;
            }, function(error) {
              console.log(error);
            });
            SearchData.clearCoords();
        } else {
          $ionicLoading.show();
          geo.getHighAccuracyPosition().then(function(position) {
            var pos = {lat: position.coords.latitude,
                       lng: position.coords.longitude};
           $ionicLoading.hide();
            barFactory.findNearby(pos.lng, pos.lat, $localStorage.user.searchRadius).then(function(response) {
              $scope.bars = response.data;
            }, function(error) {
              console.log(error);
            });
          }, function(error) {
            alert(JSON.stringify(error));
            $ionicLoading.hide();
          });
        }
    })(geo);

  // refreshes dashboard information
  $scope.updateBars = function() {
        geo.getHighAccuracyPosition().then(function(position) {
          var pos = {lat: position.coords.latitude,
                     lng: position.coords.longitude};
          barFactory.findNearby(pos.lng, pos.lat, $localStorage.user.searchRadius).then(function(response) {
            $scope.bars = response.data;
            bars = response.data;
          }, function(error) {
            console.log(error);
          });
        }, function(error) {
          alert(JSON.stringify(error));
        });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };
})

.controller('BarMapController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, uiGmapGoogleMapApi, $window, barFactory, geo){

  $scope.window = $window;
  $scope.bars = [];

  (function(geo) {
        $ionicLoading.show();
        geo.getPosition().then(function(position) {
          var pos = {latitude: position.coords.latitude,
                     longitude: position.coords.longitude};
         $ionicLoading.hide();
          barFactory.findNearby(pos.longitude, pos.latitude, $localStorage.user.searchRadius).then(function(response) {
            $scope.bars = thaiMassageBars(response.data);
          }, function(error) {
            console.log(error);
           $ionicLoading.hide();
          });
        }, function(error) {
          alert(JSON.stringify(error));
         $ionicLoading.hide();
        });
    })(geo);

function thaiMassageBars (bars) {
  var result = [];
  for (var i = bars.length - 1; i >= 0; i--) {
    result.unshift(shoveIntoArray(bars[i].obj));
  }
  return result;
}

function shoveIntoArray (bar) {
    var ret = bar;
    var location = ret.loc;
    ret.loc = {longitude : location[0],
               latitude  : location[1] };
    ret.onClick = function() {
                ret.show = !ret.show;
              };
    ret.show = false;
  return ret;
}

  $scope.mapOptions = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
  // uiGmapGoogleMapApi.then(function(maps) {
  //   console.log(maps);
  // });

})

.controller('BarSingleController', function($scope, $http, $location, $stateParams, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, barFactory, checkinFactory, reviewFactory, postFactory, crawlFactory, bar, posts, aggregate, geo){

  $scope.bar = bar;
  $scope.posts = posts.data;
  $scope.aggregates = aggregate.data[0];
  $scope.reviewButtonText = '';
  $scope.isDisabled = false;


  // if there is aggregate data, message is displayed in view
  $scope.emptyAggregateMessage = function () {
    if($scope.isCheckedIn()) {
      return "Be the first to review this bar!";
    } else {
      return "Check in to leave a review!";
    }
  };

  //get all posts
  function getPosts () {
    postFactory.getAll($scope.bar._id)
      .success(function (data) {
        $scope.posts = data;
      })
      .error(function (data) {
        alert(data.message);
      });
  }


  // refreshes dashboard information
  $scope.updateDash = function() {
    getAggs();
    getPosts();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };


  //Check if you are checked into the bar
  $scope.isCheckedIn = function() {
    if($localStorage.lastCheckin){
      return bar._id === $localStorage.lastCheckin.barId;
    }else {
      return false;
    }
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

  $scope.checkinButtonMsg = "Check In!";
  // Can't check in unless you are you at least 200ft away from the bar
  (function(){
    if ($stateParams.distance > 0.04) {

      $scope.ifNotNearBy = true;
      $scope.checkinButtonMsg = "Too far away to check in!";

    } else if ($localStorage.lastCheckin && $localStorage.lastCheckin.barId === bar._id) {

      $scope.ifNotNearBy = true;
      $scope.checkinButtonMsg = "Checked In!";

    } else {

      $scope.ifNotNearBy = false;
      $scope.checkinButtonMsg = "Check In!";

    }
  })();

  // Validation to see if you have initialized the crawl
  function crawlStarted() {
    return ($localStorage.currentCrawl !== undefined);
  }

  // Check In Feature
  $scope.checkInToBar = function() {
    // have you started a crawl yet?
    if (crawlStarted()) {

      // okay, fetch the crawl from DB
      crawlFactory.get($localStorage.currentCrawl.id).then(function(crawl){

        // create a checkin in the DB
        checkinFactory.create({
          userId: $localStorage.user.id,
          barId: $scope.bar._id
        }).then(function(checkin) {

          // store the checkin data in localstorage
          var massagedCheckin = {
            barId     : checkin.data._bar,
            userId    : checkin.data._user,
            timestamp : checkin.data.createdAt
          };
          $localStorage.lastCheckin = massagedCheckin;
          // store the checkin into the crawl's DB
          crawlFactory.storeCheckin(crawl.data._id, checkin.data._id).then(function(response) {

            // update the currentCrawl in localstorage
              $localStorage.currentCrawl.checkins.push(response.data._checkins.slice(-1)[0]);
          }, function(error) {
            console.log("crawlFactory storeBar", error);
          });

        }, function(error) {
          console.log("checkinFactory create", error);
        });

      }, function(error) {
        console.log("crawlFactory get", error);
      });

      // disable the checkin button
      $scope.ifNotNearBy    = true;
    } else {

      // if you haven't created a crawl yet
      crawlFactory.create($localStorage.user.id).then(function(crawl) {

        // store the crawl in the local storage
        var massagedCrawl = {
          id      : crawl.data._id,
          leader  : crawl.data._leader,
          checkins    : crawl.data._checkins
        };
        $localStorage.currentCrawl = massagedCrawl;

        // create a checkin in the DB
        checkinFactory.create({
          userId: $localStorage.user.id,
          barId: $scope.bar._id
        }).then(function(checkin) {

          // store the checkin data in localstorage
          var massagedCheckin = {
            barId     : checkin.data._bar,
            userId    : checkin.data._user,
            timestamp : checkin.data.createdAt
          };
          $localStorage.lastCheckin = massagedCheckin;

          // store the checkin into the crawl's DB
          crawlFactory.storeCheckin(crawl.data._id, checkin.data._id).then(function(response) {

            // update the currentCrawl in localstorage
              $localStorage.currentCrawl.checkins.push(response.data._checkins.slice(-1)[0]);
          }, function(error) {
            console.log("crawlFactory storeCheckin", error);
          });

        }, function(error) {
          console.log("checkinFactory create", error);
        });

      }, function(error) {
        console.log("crawlFactory create", error);
      });
    }
    // disable the checkin button
    $scope.ifNotNearBy    = true;
  };

  // Voting feature
  $scope.upvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/up/" + postId).then(function (votes) {
      getPosts();
    }, function (error) {
      alert('Failed: ' + error);
    });

    $scope.isDisabled = true;
    console.log($scope.isDisabled);
  };

  $scope.downvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/down/" + postId).then(function (votes) {
      getPosts();
    }, function (error) {
      alert('Failed: ' + error);
    });

    $scope.isDisabled = true;
    console.log($scope.isDisabled);
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
