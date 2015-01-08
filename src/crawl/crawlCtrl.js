angular.module('crawlCtrl', []).

controller('CrawlController', function($scope, $http, $state, $location, $localStorage, $ionicHistory, crawlFactory){
	$scope.crawlData = {};

	$scope.startCrawl = function() {
		crawlFactory.create({userId: $localStorage.user.id, name: $scope.crawlData.name}).then(function(response) {
			console.log(response);
			// save current crawl data to localstorage for easy access across the app
			var crawl = {
				id 					: response.data._id,
				leader			: response.data._leader,
				checkins 		: response.data._checkins,
				name				: response.data.name
			};

			$localStorage.currentCrawl = crawl;

			$ionicHistory.nextViewOptions({
			    disableAnimate  : false,
			    disableBack     : true
			});

			$scope.crawlData = {};

			$state.go('app.barsMap');

		}, function(error) {
			console.log(error.data.message);
			$state.go('app.start');
		});
	};

})

.controller('CurrentCrawlController', function($scope, $timeout, $ionicActionSheet, $stateParams, $http, $location, $localStorage, $ionicModal, $ionicHistory, crawlFactory) {


	$scope.noBars = $stateParams.ended || false;

	(function() {
		if ($localStorage.currentCrawl && $localStorage.currentCrawl.checkins.length !== 0) {
			$scope.noBars = true;
		}
	})();

	(function(){
	  if ($localStorage.currentCrawl && $localStorage.currentCrawl.id === $stateParams.crawlId) {
	    $scope.ifEnded = false;
	    $scope.endCrawlButtonMsg = "End";

	  } else {
	    $scope.ifEnded = true;
	    $scope.endCrawlButtonMsg = "Ended";

	  }
	})(); 

	$scope.checkins = [];
	(function(){
		if ($localStorage.currentCrawl) {
			$scope.crawlTitle = $localStorage.currentCrawl.name;
			crawlFactory.get($stateParams.crawlId).then(function(populatedCrawl) {
				for (var i = 0; i < populatedCrawl.data._checkins.length; i++) {
				  $scope.checkins.push(populatedCrawl.data._checkins[i]); 
				}
			}, function(error) {
				console.log(error);
			});
		} else {
			crawlFactory.getPast($stateParams.crawlId).then(function(populatedCrawl) {

        for (var i = 0; i < populatedCrawl.data._checkins.length; i++) {
          $scope.checkins.push(populatedCrawl.data._checkins[i]); 
        }
			}, function(error) {
        console.log(error);
			});
		}
	})();

	// Confirmation Modal
	// $ionicModal.fromTemplateUrl('crawl/confirmationModal.tpl.html', {
	// 	scope: $scope
	// }).then(function(modal) {
	// 	$scope.confirmationModal = modal;
	// });

	// $scope.openConfirmationModal = function() {
	// 	$scope.confirmationModal.show();
	// };

	// $scope.closeConfirmationModal = function() {
	// 	$scope.confirmationModal.hide();
	// }


	//ACTIONSHEET CODE
	// Triggered on a button click, or some other target
 	$scope.showActionSheet = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     destructiveText: 'End Crawl',
     titleText: 'Are you sure you want to end your crawl?',
     cancelText: 'Cancel',
     cancel: function() {
          // $ionicActionSheet.hide();
          console.log('canceling...');
        },
     destructiveButtonClicked: function() {
       $scope.endCrawl();
     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 2000);

 };


	$scope.endCrawl = function() {
		crawlFactory.end($localStorage.currentCrawl.id).then(function(response) {

			delete $localStorage.currentCrawl;
			delete $localStorage.lastCheckin;
			$ionicHistory.nextViewOptions({
			    disableAnimate  : false,
			    disableBack     : true
			});
			$scope.confirmationModal.hide();
			$state.go('app.start', {}, {reload: true});
		}, function(error) {
			console.log(error);
		})
	};
})

.controller('CrawlHistoryController', function($scope, $http, $location, $localStorage, crawlFactory, crawls) {
	console.log(crawls)
	$scope.crawls = crawls.data;
});






