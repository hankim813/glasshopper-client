angular.module('settingsModel', [])

.factory('settingsFactory', function($localStorage, $http) {
  return {
    update 	: function(newRadius, userId) {
      //return $http.post('http://127.0.0.1:3000/api/user/'+userId+'/settings', newRadius);
      console.log('newRadius: ',newRadius);
    }
  };
});