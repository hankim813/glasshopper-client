angular.module('crawlCtrl', []).

controller('CrawlController', function($scope, $http, $location, $localStorage, crawlFactory){

	$scope.startCrawl = function() {
		crawlFactory.create({userId: $localStorage.user.id}).then(function(response) {
			// save current crawl data to localstorage for easy access across the app
			var crawl = {
				id 			: response.data._id,
				leader	: response.data._leader,
				bars 		: response.data._bars
			};
			$localStorage.currentCrawl = crawl;
			// process query
			// findGeoloc($scope.barQuery);
			// then clear form
			$scope.barQuery = {};

		}, function(error) {
			console.log(error);
		});
	};

	function findGeoloc(barQuery) {
		// process query and find geo query then redirect
		
		// $location.path('/app/bars/findNextBar/' + desiredGeolocation);
	};
})

.controller('CurrentCrawlController', function($scope, $http, $location, $localStorage, crawlFactory, currentCrawl) {

});