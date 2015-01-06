angular.module('settingsModel', [])

.factory('settingsFactory', function($localStorage, $http) {
  return {
  	getSettings : function() {
  		return $http.get('http://127.0.0.1:3000/api/users/' + $localStorage.user.id + '/settings');
  	},
    update 	: function(newSettings, userId) {
      return $http.put('http://127.0.0.1:3000/api/users/' + $localStorage.user.id + '/settings', newSettings);
    }
  };
});
