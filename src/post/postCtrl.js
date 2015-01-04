angular.module('postCtrl', [])

.controller('PostController', function($scope, $http, $location, $localStorage, postFactory) {

	$scope.postData 	= { 
		barId: $scope.bar._id,
		userId: $localStorage.user.id
  };

	$scope.uploadPost = function(){
		postFactory.create($scope.postData)
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

