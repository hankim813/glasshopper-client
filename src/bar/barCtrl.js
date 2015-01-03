angular.module('barCtrl', []).

controller('BarController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bars){

  $scope.bars = bars;

}).
controller('BarSingleController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, barFactory, bar){

  $scope.bar = bar;

});
