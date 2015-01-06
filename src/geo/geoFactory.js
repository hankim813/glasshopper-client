angular.module('geoModule', []).

  factory('geo', ['$cordovaGeolocation', function($cordovaGeolocation){
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