angular.module('barCtrl', ['ionic'])

.controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, SearchData){
  function init () {
        if (SearchData.getCoords()) {
            barFactory.findNearby(SearchData.getCoords().lng, SearchData.getCoords().lat, $localStorage.user.searchRadius).then(function(response) {
              $scope.bars = response.data;
            }, function(error) {
              console.log(error);
            });
            SearchData.clearCoords();
        } else {
          var pos = {lat: $localStorage.currentPosition.latitude,
                     lng: $localStorage.currentPosition.longitude};
            barFactory.findNearby(pos.lng, pos.lat, $localStorage.user.searchRadius).then(function(response) {
              $scope.bars = response.data;
            }, function(error) {
              console.log(error);
            });
        }
    }

    init();

  // refreshes dashboard information
  $scope.updateBars = function() {
    var pos = {lat: $localStorage.currentPosition.latitude,
               lng: $localStorage.currentPosition.longitude};
    barFactory.findNearby(pos.lng, pos.lat, $localStorage.user.searchRadius).then(function(response) {
      $scope.bars = response.data;
      bars = response.data;
    }, function(error) {
      console.log(error);
    });
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };

})

.controller('BarMapController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, uiGmapGoogleMapApi, barFactory, geo, DeviceInfo){

  $scope.device = DeviceInfo;
  $scope.bars = [];

  $scope.myPosition = $localStorage.currentPosition;
  $scope.userId = $localStorage.user.id;

  function init () {
    var pos = {lat: $localStorage.currentPosition.latitude,
               lng: $localStorage.currentPosition.longitude};
        barFactory.findNearby(pos.lng, pos.lat, $localStorage.user.searchRadius).
          then(function(response) {
            $scope.bars = thaiMassageBars(response.data);
          }, function(error) {
            console.log(error);
          });
    };

    init();

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

.controller('BarSingleController', function($scope, $http, $location, $stateParams, $ionicHistory, $localStorage, $ionicLoading, $ionicTabsDelegate, $ionicModal, $ionicScrollDelegate, barFactory, checkinFactory, reviewFactory, postFactory, crawlFactory, bar, posts, aggregate, geo){
  $scope.bar = bar;
  $scope.posts = posts.data;
  // default data for aggregates
  $scope.aggregates = {
                        avgAge: 1,
                        crowdLevel: 1,
                        ggRatio: 1,
                        noiseLevel: 1,
                        reviews: 0
                      };
  if(aggregate.data[0]) {
    $scope.aggregates = aggregate.data[0];
  }

  // console.log('aggregate from resolve', aggregate);
  // console.log('aggregates at instantiation: ', $scope.aggregates);
  // if there is aggregate data, message is displayed in view

  function getAggs () {
    reviewFactory.fetchAggregate(review.bar)
      .success(function (data) {
          if(data[0]) {
            $scope.aggregates = data[0];
          }
        $scope.visualize();
      })
      .error(function (data) {
        alert(data.message);
      });
  }
    // VISUALIZATIONS
  $scope.calculateNoise = function() {
    //determine the colors for our volume bar graph
    var noiseLevel = 1;
    if ($scope.aggregates.noiseLevel) {
      noiseLevel = $scope.aggregates.noiseLevel;
    } else {
      noiseLevel = 1;
    }

    var fillColors = ["rgb(255, 158, 0)",
                      "rgb(255, 94, 0)",
                      "rgb(232, 123, 12)",
                      "rgb(232, 63, 12)",
                      "rgb(255, 41, 17)"];
    for (i = 1; i < fillColors.length; i ++ ) {
      if (i >= noiseLevel) {
        fillColors[i] = "rgb(214,214,214)"; //faded blue
      }
    }

    return fillColors;
  };

  $scope.calculateAge = function() {
    //determine the colors for our volume bar graph
    var ageLevel = 1;
    if ($scope.aggregates.avgAge) {
      ageLevel = $scope.aggregates.avgAve;
    } else {
      ageLevel = 1;
    }

    var fillColors = ["rgb(79, 247, 194)",
                      "rgb(66, 214, 210)",
                      "rgb(80, 200, 237)",
                      "rgb(70, 112, 247)",
                      "rgb(8, 111, 214)"];
    for (i = 1; i < fillColors.length; i ++ ) {
      if (i >= ageLevel) {
        fillColors[i] = "rgb(214,214,214)"; //faded blue
      }
    }

    return fillColors;
  };

  $scope.visualize = function() {
    var volumeColors = $scope.calculateNoise();
    var ageColors = $scope.calculateAge();
    $('.crowd').peity('donut', { width: 50, height: 60, radius: 10 });
    $('.gender').peity('pie',
      {
        width: 55,
        height: 55,
        fill: ["#DA7C8E", "#56C7ED"]
      });
    $('.volume-bar').peity('bar',
      {
        width: 55,
        height: 55,
        fill: volumeColors
      });
    $('.age-bar').peity('bar',
      {
        width: 55,
        height: 55,
        fill: ageColors
      });
  };

  $scope.emptyAggregateMessage = function () {
    if($scope.isCheckedIn()) {
      return "Be the first to review this bar!";
    } else {
      return "Check in to leave a review!";
    }
  };

  //scroll to bottom
  $scope.scrollToBottom = function() {
    $ionicScrollDelegate.scrollBottom();
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
    $scope.visualize();
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
  $scope.selectTab = function(id, index){
    if(id == "barTabs"){
      $ionicTabsDelegate._instances[0].select(index);
    }else {
      $ionicTabsDelegate._instances[1].select(index);
    }
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
    $scope.visualize();
    if ($stateParams.distance > 0.1) { //CHECK_IN_RADIUS

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
      crawlFactory.create({userId: $localStorage.user.id, name: new Date()}).then(function(crawl) {
        // store the crawl in the local storage
        var massagedCrawl = {
          id          : crawl.data._id,
          leader      : crawl.data._leader,
          checkins    : crawl.data._checkins,
          name        : crawl.data.name
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
  };

  $scope.downvote = function(postId) {
    $http.put("http://127.0.0.1:3000/api/votes/down/" + postId).then(function (votes) {
      getPosts();
    }, function (error) {
      alert('Failed: ' + error);
    });
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
    $scope.selectTab("barTabs", 1);
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
    // console.log("in onReviewSubmit");
    $scope.formSubmissionToggle();
    // getAggs();
    // console.log("visualizing from onReviewSubmit");
    // $scope.visualize();
    $scope.closeReview();
    $scope.selectTab("reviewTabs", 0);
    $scope.selectTab("barTabs", 0);
    // $scope.updateDash();
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
      $scope.scrollToBottom();
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
