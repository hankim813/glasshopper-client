angular.module('barCtrl', [])

.controller('BarController', function($scope, $http, $location, $localStorage, $ionicHistory, $cordovaOauth, $ionicLoading, UserAuthFactory, AuthenticationFactory, UserProfileFactory){

	//retrieve a Bar model object
	//name, address, photoUrl, avgPrice (between 1 - 5), location (array with long and lat values)
	//createdAt, updatedAt

	//for now, we use stub data
	$scope.barData = {
		name    : "Blackthorn",
	  address : "1234 Fleet Street, San Francisco CA 90029",
	  photoUrl: "http://cdn.partyearth.com/photos/a24c7146df1ffac2eb3249d542c2ce7f/blackthorn-tavern_s345x230.jpg?1375139690",
	  avgPrice: 2,
	  location: ""
	};

	//eventually replace stub data with this API call
	$scope.retrieveBarData = function(){
		$http.get('/fetch', {
			params: {latLng: "37.7631823,-122.4659945"}
		}).
			success(function(data){
				$scope.barData = data;
			}).
			error(function(){
				console.log("could not retrieve bar data");
			});
	};


});
