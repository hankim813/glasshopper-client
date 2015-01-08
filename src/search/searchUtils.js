angular.module('searchModule', [])

.factory('SearchData', [ function(){
    var data = {};
    return {
      getCoords: function () {
        return data.coords;
      },
      clearCoords: function () {
        delete data.coords;
      },
      setCoords: function (coords) {
        return data.coords = coords;
      }
    }
}]);