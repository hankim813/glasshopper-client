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
}])

.run(['$templateCache', function ($templateCache) {
  $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
  $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
}])