angular.module('postFactories', [])

.factory('postFactory', function($location, $http) {
  return {
    
    create	: function(postData) {
    	console.log(postData);
      return $http.post('http://127.0.0.1:3000/api/posts', postData);
    },

    get			: function(id) {
      return $http.get('http://127.0.0.1:3000/api/posts/' + id);
    },

    getAll	: function(barId) {
    	return $http.get('http://127.0.0.1:3000/api/posts/bars/' + barId);
    }
  }
});