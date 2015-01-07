angular.module('barModel', [])

.factory('barFactory', function barFactory ($localStorage, $location, $http) {
  return {
    findNearby: function(lng,lat,radius) {
      return $http(
                  { url         : 'http://127.0.0.1:3000/api/bars/nearby',
                    method      : 'GET',
                    params      :
                      { lng     : lng,
                        lat     : lat,
                        radius  : radius }
      }).then(
        function(response) {
          barFactory.bars = response.data;
        },
        function(error) {});
    },

    get: function(barId) {
      return $http(
                  { url         : 'http://127.0.0.1:3000/api/bars/'+barId,
                    method      : 'GET'
      }).then(function(response) {
        barFactory.bar = response.data;
      });
    }
  }

});