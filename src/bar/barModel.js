angular.module('barModel', [])

.factory('barFactory', function($localStorage, $location, $http) {
  return {
    findNearby: function(lng,lat,radius) {
      return $http({url: 'http://127.0.0.1:3000/api/bars/nearby',
                method: 'GET',
                params:{lng: lng,
                        lat: lat,
                        radius: radius}
      }).then(function(response) {
        console.log(response.data);
        return response.data;
      });
    }
  }
});