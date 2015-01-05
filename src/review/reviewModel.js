angular.module('reviewModel', [])

.factory('reviewFactory', function($localStorage, $location, $http) {
  return {
    create: function(reviewData) {
      return $http.post('http://127.0.0.1:3000/api/reviews', reviewData);
    },
    get   : function(barId) {
      return $http.get('http://127.0.0.1:3000/api/reviews/' + barId);
    },
    update: function(barId, reviewData) {
      return $http.put('http://127.0.0.1:3000/api/reviews/' + barId, reviewData);
    }
  };
});