angular.module('postCtrl', [])

.controller('PostController', function($scope, $http, $location, $localStorage, postFactory) {

	$scope.postData 	= {};

	$scope.uploadPost = function(){
		var data 				= $scope.postData;
		data.userId 		= $localStorage.user.id
		// data.barId = $localStorage.bar.id // WE SHOULD ADD BAR ID

		postFactory.create(data)
			.success(postSuccessCallBack)
			.error(postErrorCallback);
	};

	function postSuccessCallBack(result){
		$scope.postData = {};
		$location.path("/app/posts/" + result._id);
	};

	function postErrorCallback (error) {
		console.log('error');
	};
})

.controller('PostSingleController', function($scope, post) {
	$scope.post 			= post.data;
});

