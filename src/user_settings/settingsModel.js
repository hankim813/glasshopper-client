angular.module('settingsModel', [])

.factory('settingsFactory', function($localStorage, $http) {
  return {
    update 	: function(newSettings, userId) {
      return $http.put('http://127.0.0.1:3000/api/users/'+userId+'/settings', newSettings);
    }
  };
});