angular.module('crawlFactories',[])

.factory('crawlFactory', function($localStorage, $http, $location) {
	return {

		create	: function(crawlData) {
			return $http.post('http://127.0.0.1:3000/api/crawls/', {data: crawlData, access_token: $localStorage.token});
		},

		get 		: function(crawlId) {
			return $http.get('http://127.0.0.1:3000/api/crawls/' + crawlId);
		},

		getPast : function(crawlId) {
			return $http.get('http://127.0.0.1:3000/api/crawls/' + crawlId + '/closed');
		},

		getAll	: function() {
			return $http.get('http://127.0.0.1:3000/api/crawls/users/' + $localStorage.user.id);
		},

		end			: function(crawlId) {
			return $http.put('http://127.0.0.1:3000/api/crawls/' + crawlId, {access_token: $localStorage.token});
		},

		storeCheckin: function(crawlId, checkinId) {
			return $http.put('http://127.0.0.1:3000/api/crawls/' + crawlId + "/checkins/" + checkinId);
		}
	}
});