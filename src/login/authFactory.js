angular.module('authFactories', [])

.factory('AuthenticationFactory', function($localStorage) {
  var auth = {
    isLogged: false,
    check: function() {
      if ($localStorage.token && $localStorage.user) {
        this.isLogged = true;
      } else {
        this.isLogged = false;
        delete $localStorage.user;
        delete $localStorage.token;
      }
    }
  }

  return auth;
})

.factory('UserAuthFactory', function($localStorage, $location, $http, AuthenticationFactory) {
  return {
    login: function(loginData) {
      return $http.post('http://127.0.0.1:3000/api/signin', loginData);
    },
    logout: function() {

      if (AuthenticationFactory.isLogged) {

        AuthenticationFactory.isLogged = false;

        delete $localStorage.token;
        delete $localStorage.user;

        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/landing");
      }

    }
  }
})

.factory('TokenInterceptor', function($q, $localStorage) {
  return {
    request: function(config) {
      config.headers = config.headers || {};
      if ($localStorage.token) {
        config.headers['X-Access-Token'] = $localStorage.token;
      }
      return config || $q.when(config);
    },

    response: function(response) {
      return response || $q.when(response);
    }
  };
});