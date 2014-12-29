angular.module('glassHopper.controllers', [])

.controller('AppCtrl', function($scope, $location, $ionicHistory, AuthenticationFactory) {
      if(!AuthenticationFactory.isLogged) {
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });
        $location.path("/landing");
      }
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
