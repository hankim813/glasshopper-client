angular.module('postCtrl', [])

.controller('PostController', function($scope, $http, $location, $localStorage, postFactory) {

	$scope.postData 	= {};

	$scope.uploadPost = function(){
		var data 				= $scope.postData;
		data.userId 		= $localStorage.user.id

		postFactory.create(data)
			.success(postSuccessCallBack)
			.error(postErrorCallback);
	};

	function postSuccessCallBack(result){
		$scope.postData = {};
		// Should refresh the activity feed
	};

	function postErrorCallback (error) {
		console.log('error');
	};
})

.controller('PostSingleController', function($scope, post) {
	$scope.post 			= post.data;
});

