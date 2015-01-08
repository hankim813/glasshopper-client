angular.module('glassHopper', [ 'ionic',
                                'ngCordova',
                                'ngStorage',
                                'ngResource',
                                'templates',
                                'appCtrl',
                                'loginRoutes',
                                'loginCtrl',
                                'authFactories',
                                'barModel',
                                'barRoutes',
                                'barCtrl',
                                'reviewCtrl',
                                'reviewModel',
                                'postRoutes',
                                'postCtrl',
                                'postFactories',
                                'checkinFactories',
                                'settingsModel',
                                'settingsRoutes',
                                'userSettingsCtrl',
                                'crawlRoutes',
                                'crawlCtrl',
                                'crawlFactories',
                                'geoModule',
                                'customFilters',
                                'ion-google-place',
                                'uiGmapgoogle-maps',
                                'searchModule',])


.run(function ($rootScope, $ionicPlatform, $cordovaSplashscreen, $location, $ionicHistory, AuthenticationFactory, $localStorage, $state, geo) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
    };


    AuthenticationFactory.check();

    if (!AuthenticationFactory.isLogged) {
      $location.path("/landing");
    } else {
      $state.go('app.start');
    };

    $cordovaSplashscreen.hide();

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
      if (toState.name !== 'login' && toState.name !== 'register' && toState.name !== 'landing') {
        if (!AuthenticationFactory.isLogged) {
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $location.path("/landing");
        }
      };
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      // if the user is already logged in, take him to the home page
      if (AuthenticationFactory.isLogged == true && (toState.url === '/login' || toState.url === '/register' || toState.url === '/landing')) {
        $state.go('app.start');
      }
    });

    geo.init();

  });
})

.config(function(uiGmapGoogleMapApiProvider, $stateProvider, $urlRouterProvider, $httpProvider) {

  uiGmapGoogleMapApiProvider.configure({
    key: 'AIzaSyCnGPgN8OsQ4HinCVpHx0rxtjtltJYoVpE',
    v: '3.17',
    libraries: 'places,geometry'
  });

  $httpProvider.interceptors.push('TokenInterceptor');

  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppController'
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/bars/map');
})

.factory('BarData', function () {
    var data = {};
    return {
      getBars: function () {
        return data.bars;
      },
      clearBars: function () {
        delete data.bars;
      },
      setBars: function (bars) {
        return data.bars = bars;
      }
    }
})

.factory('DeviceInfo', ['$window', function($window){
    var data = {};

    function init () {
      data.height = $window.innerHeight;
      data.width = $window.innerWidth;
    };

    init();

    return {
      width: function () {
        return data.width;
      },
      height: function () {
        return data.height;
      }
    }
}]);
