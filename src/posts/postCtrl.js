angular.module('postCtrl', [])

.controller('PostController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, postFactory, post) {

	$scope.postData = {};
	console.log("post is" + JSON.stringify(post));
	$scope.post = post.data;

	$scope.uploadPost = function(){
		var data = $scope.postData;
		// data.userId = $localStorage.user.id // WE SHOUD ADD OBJECTID
		// data.barId = $localStorage.bar.id // WE SHOULD ADD BAR ID
		postFactory.create(data)
			.success(postSuccessCallBack)
			.error(postErrorCallback);
	};

	function postSuccessCallBack(result){
		$scope.postData = {};
		console.log(JSON.stringify(result._id));
		$location.path("/app/posts/" + result._id);
	};

	function postErrorCallback (error) {
		console.log('error');
	};
});

