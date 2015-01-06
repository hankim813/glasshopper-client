// angular.module('photoCtrl', [])

// .controller('PhotoController', function($scope, $http, $location, $ionicHistory, $localStorage, $ionicLoading, $cordovaCamera, photoFactory, photo) {

// 	$scope.photoData = {};
// 	$scope.photo = photo;
// 	$scope.imgURI = "";

// 	$scope.selectPhotoFromPhone = function() {
//   	var options = { 
//   		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
//   		destinationType: Camera.DestinationType.FILE_URL,
//   		targetWidth: 300,
//       targetHeight: 300,
//     };

//   	$cordovaCamera.getPicture(options).then(
//   		function(imageData) {
//   			// render preview of the image
//   			// $scope.imgURI = "data:image/jpeg;base64," + imageData;
//   			$scope.imgURI = imageData;
//   			// attach caption and save to db
//   			var data = {
//   				uri: imageData,
//   				caption: $scope.photoData.caption
//   			}
//   			photoFactory.upload(data);
//   		}, 
//   		function(error) {
//     		console.log(error);
// 		});		
// 	}

// 	$scope.uploadPhoto = function(){
// 		var data = $scope.photoData;
// 		console.log(data);
// 		// data.userId = $localStorage.user.id // WE SHOUD ADD OBJECTID
// 		// data.barId = $localStorage.bar.id // WE SHOULD ADD BAR ID
// 		// photoFactory.create(data)
// 		// 	.success(photoSuccessCallBack)
// 		// 	.error(photoErrorCallBack);
// 	};

// 	function photoSuccessCallBack(result){
// 		$scope.photoData = {};
// 		$location.path("/app/photos/" + result._id);
// 	};

// 	function photoErrorCallBack (error) {
// 		console.log('error');
// 	};
// });

