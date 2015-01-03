// angular.module('photoFactories', [])

// .factory('photoFactory', function($location, $http, $cordovaCamera, $localStorage) {
//   return {

//     upload: function(photoData) {

// 			console.log("ABOUT TO HIT THE SERVER");
// 			console.log(photoData);
// 	    var ft = new FileTransfer();
// 			var options = new FileUploadOptions();

// 			options.fileKey = "file";
// 			options.fileName = photoData.uri.substr(photoData.uri.lastIndexOf('/') + 1);
// 			options.mimeType = "image/jpeg";
// 			options.chunkedMode = false;
// 			options.params = { // Whatever you populate options.params with, will be available in req.body at the server-side.
// 			 caption: photoData.caption,
// 			};
// 			options.headers = {
// 				'x-access-token': $localStorage.token
// 			};

// 			ft.upload(photoData.uri, 'http://127.0.0.1:3000/api/photos',
// 				function (success) {
// 					console.log("YAY");
// 				},
// 				function (error) {
// 				   alert("Upload failed");
// 				}, options);


//       // return $http.post('http://127.0.0.1:3000/api/photos', photoData);
//     },
//   }
// });