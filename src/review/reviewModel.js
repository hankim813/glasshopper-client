angular.module('reviewModel', [])

.factory('reviewFactory', function($localStorage, $location, $http) {
  return {
    create: function(barId, reviewData) {
      return $http.post('http://127.0.0.1:3000/api/bars/' + barId + '/reviews', reviewData);
    },
    fetchAggregate   : function(barId) {
      return $http.get('http://127.0.0.1:3000/api/bars/' + barId + '/reviews');
    },
    update: function(barId, reviewId, reviewData) {
      return $http.put('http://127.0.0.1:3000/api/bars/' + barId + '/reviews/' + reviewId, reviewData);
    }
  };
});