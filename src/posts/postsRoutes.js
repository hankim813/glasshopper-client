angular.module('postRoutes', ['ionic', 'postFactories'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.posts', {
    url: "/posts",
    resolve: {
      post: function(){
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
      post: function(postFactory, $stateParams) {
        return postFactory.fetch($stateParams.postId);
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