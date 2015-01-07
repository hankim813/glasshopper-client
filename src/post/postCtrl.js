angular.module('postCtrl', [])

.controller('PostController', function($scope, $http, $location, $localStorage, postFactory) {
	// MOVED TO BAR CONTROLLER

  // $scope.postData     = {
  //   barId: $scope.bar._id,
  //   userId: $localStorage.user.id
  // };
	// $scope.postData     = {
	// 	barId: $scope.bar._id,
	// 	userId: $localStorage.user.id
 //  };

	// $scope.uploadPost   = function(){
	// 	console.log(1);
	// 	postFactory.create($scope.postData, $scope.bar._id)
	// 		.success(postSuccessCallBack)
	// 		.error(postErrorCallback);
	// };

	// function getPosts () {
	// 	console.log(3);
 //    postFactory.getAll($scope.bar._id)
 //      .success(function (data) {
 //        console.log(4);
 //        console.log('post controller - posts get route', data);
 //        $scope.posts  = data;
 //      })
 //      .error(function (data) {
 //        alert(data.message);
 //      });
	// }

	// function postSuccessCallBack(result){
	// 	console.log(2);
	// 	$scope.postData   = {
	// 		barId: $scope.bar._id,
	// 		userId: $localStorage.user.id
 //    };
 //    getPosts();
	// }

 //  function postErrorCallback (error) {
 //    console.log('error');
	// }
})

.controller('PostSingleController', function($scope, post) {
	$scope.post         = post.data;
});

