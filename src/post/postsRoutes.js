angular.module('postRoutes', ['ionic', 'postFactories'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app.posts', {
    url     : "/posts",
    views   : {
      'menuContent' : {
        templateUrl   : "post/post-form.tpl.html",
        controller    : 'PostController'
      }
    }
  })

  .state('app.post', {
    url     : "/posts/:postId",
    resolve : {
      post  : function(postFactory, $stateParams) {
        return postFactory.get($stateParams.postId);
      }
    },
    views   : {
      'menuContent' : {
        templateUrl : "post/post-show.tpl.html",
        controller  : 'PostSingleController'
      }
    }
  });
});