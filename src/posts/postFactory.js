angular.module('postFactories', [])

.factory('postFactory', function($location, $http) {
  return {
    
    create: function(postData) {
      return $http.post('http://127.0.0.1:3000/api/posts', postData);
    }
  }
});