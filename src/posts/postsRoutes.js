angular.module('postRoutes', ['ionic'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.posts', {
    url: "/posts",
    resolve: {
      post: function(){
        console.log("resolving in /posts");
        return {}
      }
    },
    views: {
      'menuContent': {
      templateUrl: "posts/post-form.tpl.html",
      controller: 'PostController'
      }
    }
  })

  .state('app.post', {
    url: "/posts/:postId",
    resolve: {
      post: function($http, $stateParams) {
        console.log("resolving in /posts/:postId");
        console.log($stateParams);
        return $http.get('http://127.0.0.1:3000/api/posts/' + $stateParams.postId);
      }
    },
    views: {
      'menuContent': {
        templateUrl: "posts/post-show.tpl.html",
        controller: 'PostController'
      }
    }
  });
});