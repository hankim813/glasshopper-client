angular.module('crawlCtrl', []).

controller('CrawlController', function($scope, $http, $location, $localStorage, $ionicHistory, crawlFactory){
	$scope.searchData = {};

	$scope.startCrawl = function() {
		crawlFactory.create({userId: $localStorage.user.id}).then(function(response) {

			// save current crawl data to localstorage for easy access across the app
			var crawl = {
				id 			: response.data._id,
				leader	: response.data._leader,
				checkins 		: response.data._checkins
			};

			$localStorage.currentCrawl = crawl;

			// process query
			// findGeoloc($scope.barQuery);

			// then clear form
			$scope.searchData = {};
			$ionicHistory.nextViewOptions({
			    disableAnimate  : false,
			    disableBack     : true
			});
			$location.path('/app/crawls/' + crawl.id);

		}, function(error) {
			console.log(error.data.message);
			$location.path('/app/crawls');
		});
	};

	function findGeoloc(barQuery) {
		// process query and find geo query then redirect
		
		// $location.path('/app/bars/findNextBar/' + desiredGeolocation);
	};
})

.controller('CurrentCrawlController', function($scope, $http, $location, $localStorage, $ionicModal, $ionicHistory, crawlFactory, currentCrawl) {

	// Confirmation Modal
	$ionicModal.fromTemplateUrl('crawl/confirmationModal.tpl.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.confirmationModal = modal;
	});

	$scope.openConfirmationModal = function() {
		$scope.confirmationModal.show();
	};

	$scope.closeConfirmationModal = function() {
		$scope.confirmationModal.hide();
	}

	// be sure to implement the feature where it checks for idleness of the crawl. If the updatedAt date is more than 12 hours from now, then execute endCrawl()

	$scope.endCrawl = function() {
		crawlFactory.end($localStorage.currentCrawl.id).then(function(response) {

			delete $localStorage.currentCrawl;
			delete $localStorage.lastCheckin;
			$ionicHistory.nextViewOptions({
			    disableAnimate  : false,
			    disableBack     : true
			});
			$scope.confirmationModal.hide();
			$location.path('/app/crawls');
		}, function(error) {
			console.log(error);
		})
	};
})

.controller('CrawlHistoryController', function($scope, $http, $location, $localStorage, crawlFactory, crawls) {

	$scope.crawls = crawls.data;
	console.log($scope.crawls);
});






