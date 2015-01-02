angular.module('barDashboard.services', [])
.factory('BarDashboardFactory', function(){
	
	var bars = [{
		id 			: 0,
		name    : "Blackthorn",
		address : "1234 Fleet Street, San Francisco CA 90029",
		photoUrl: "http://cdn.partyearth.com/photos/a24c7146df1ffac2eb3249d542c2ce7f/blackthorn-tavern_s345x230.jpg?1375139690",
		avgPrice: 2,
		location: ""
	}, {
		id 			: 1,
		name    : "Red Room",
		address : "0984 Ocean Blvd., Santa Cruz CA",
		photoUrl: "http://cdn.partyearth.com/photos/a24c7146df1ffac2eb3249d542c2ce7f/blackthorn-tavern_s345x230.jpg?1375139690",
		avgPrice: 6,
		location: ""
	}];

	var get = function(barId){
		return bars[barId];
	}

});