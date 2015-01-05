angular.module('checkinFactories', [])

.factory('checkinFactory', function($location, $http) {
  return {
    
    create	: function(data) {
      return $http.post('http://127.0.0.1:3000/api/checkins/', data);
    },

    get			: function(checkinId) {
      return $http.get('http://127.0.0.1:3000/api/checkins/' + checkinId);
    }
  }
});