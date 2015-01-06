angular.module('crawlFactories',[])

.factory('crawlFactory', function($localStorage, $http) {
	return {

		create	: function(userId) {
			return $http.post('http://127.0.0.1:3000/api/crawls/', userId);
		},

		get 		: function(crawlId) {
			return $http.get('http://127.0.0.1:3000/api/crawls/' + crawlId);
		},

		getAll	: function() {
			return $http.get('http://127.0.0.1:300/api/crawls/users/' + $localStorage.user.id)
		},

		end			: function(crawlId) {
			return $http.put('http://127.0.0.1:3000/api/crawls/' + crawlId, {});
		}
	}
});