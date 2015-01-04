// angular.module('photoRoutes', ['ionic', 'photoFactories'])

// .config(function($stateProvider, $urlRouterProvider) {
//   $stateProvider

//   .state('app.photos', {
//     url: "/photos",
//     resolve: {
//       photo: function(photoFactory){
//         return {}
//       }
//     },
//     views: {
//       'menuContent': {
//       templateUrl: "photos/photo-form.tpl.html",
//       controller: 'PhotoController'
//       }
//     }
//   })

//   .state('app.photo', {
//     url: "/photos/:photoId",
//     // resolve: {
//     //   photo: function($http, $stateParams) {
//     //     return $http.get('http://127.0.0.1:3000/api/photos/' + $stateParams.photoId);
//     //   }
//     // },
//     views: {
//       'menuContent': {
//         templateUrl: "photos/photo-show.tpl.html",
//         controller: 'PhotoController'
//       }
//     }
//   });
// });