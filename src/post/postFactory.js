angular.module('postFactories', [])

.factory('postFactory', function($location, $http) {
  return {
    
    create	: function(postData, barId) {
      return $http.post('http://127.0.0.1:3000/api/bars/' + barId + "/posts", postData);
    },

    get			: function(barId, postId) {
      return $http.get('http://127.0.0.1:3000/api/bars/' + barId + "/posts/" + postId);
    },

    getAll	: function(barId) {
    	return $http.get('http://127.0.0.1:3000/api/bars/' + barId + "/posts");
    }
  }
});