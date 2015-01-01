angular.module('postRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.posts', {
    url: "/posts",
    views: {
      'menuContent': {
      templateUrl: "posts/post-test.tpl.html",
      controller: 'PostController'
      }
    }
  })
});