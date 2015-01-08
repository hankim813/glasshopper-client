angular.module('geoModule', []).

  factory('geo', ['$cordovaGeolocation', '$localStorage', function($cordovaGeolocation, $localStorage){

      function init () {
        var posOptions = {timeout: 10000, enableHighAccuracy: false, maximumAge: 5000}
        var watchId = $cordovaGeolocation.watchPosition(posOptions);
        watchId.then(
          null,
          function(error) {
            console.log("watchPosition error: "+ error)
          },
          function(position) {
            console.log("got position "+ position);
            var pos = {latitude: position.coords.latitude,
                       longitude: position.coords.longitude};
           $localStorage.currentPosition = pos;
          })
      };
      init();

    return {
      getPosition: function(){
        var posOptions = {timeout: 20000, enableHighAccuracy: false, maximumAge: 50000}
        return $cordovaGeolocation.getCurrentPosition(posOptions)
      },
      getHighAccuracyPosition: function(){
        var posOptions = {timeout: 20000, enableHighAccuracy: true, maximumAge: 50000}
        return $cordovaGeolocation.getCurrentPosition(posOptions)
      }
    };
  }])