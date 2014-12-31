// Ionic glassHopper App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'glassHopper' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'glassHopper.controllers' is found in controllers.js
angular.module('glassHopper', ['ionic', 'ngCordova', 'ngStorage', 'templates', 'glassHopper.controllers','loginRoutes', 'loginCtrl', 'authFactories'])


.run(function($rootScope, $ionicPlatform, $cordovaSplashscreen, $location, $ionicHistory, AuthenticationFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    AuthenticationFactory.check();

    if (!AuthenticationFactory.isLogged) {
      $location.path("/landing");
    } else {
      $location.path("/app/playlists");
    };

    // $cordovaSplashscreen.hide();

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
      if (!AuthenticationFactory.isLogged) {
        $ionicHistory.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });
        $location.path("/landing");
      }
    });

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      // if the user is already logged in, take him to the home page
      if (AuthenticationFactory.isLogged == true && (toState.url === '/login' || toState.url === '/register' || toState.url === '/landing')) {
        $location.path("/app/playlists");
      }
    });

  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('TokenInterceptor');

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
