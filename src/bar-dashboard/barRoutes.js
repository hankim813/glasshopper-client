angular.module('barRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('barView', {
    url: "/barView",
    templateUrl: "bar-dashboard/barView.tpl.html",
    controller: 'barController'
  })

});
