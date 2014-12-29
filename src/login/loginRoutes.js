angular.module('loginRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('landing', {
    url: "/landing",
    templateUrl: "login/landing.tpl.html",
    controller: 'LoginController'
  })

  .state('login', {
    url: "/login",
    templateUrl: "login/login.tpl.html",
    controller: 'LoginController'
  })

  .state('register', {
    url: "/register",
    templateUrl: "login/register.tpl.html",
    controller: 'LoginController'
  })
});