angular.module('barRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('barView', {
    url: "/bar",
    templateUrl: "bar-dashboard/barView.tpl.html",
    controller: 'barController'
  })

});