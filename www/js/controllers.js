angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('HelloCtrl', function($scope) {})
.controller('HiCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('mainCtrl', function($scope, $ionicPlatform, $cordovaFileTransfer, $cordovaCamera, $http){    
    $scope.takePhoto = function()
    {
        var options =  {
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,            
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE             
        };

        $ionicPlatform.ready(function() {
            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.picture = imageData;
            }, function(err) {
                  // error
            });
        });
    }

    $scope.uploadPhoto = function()
    {
        var options = new FileUploadOptions()
        options.fileKey = "image";

        $cordovaFileTransfer.upload('http://image-upload-example-server.herokuapp.com/upload', $scope.picture, options).then(function(result) {
            console.log("File upload complete");
            console.log(result);
            $scope.uploadResults = "Upload completed successfully"            
        }, function(err) {
            console.log("File upload error");
            console.log(err);
            $scope.uploadResults = "Upload failed"                           
        }, function (progress) {
            // constant progress updates
            console.log(progress);
        });
    }

    $scope.testConnection = function()
    {
        $http.get('http://image-upload-example-server.herokuapp.com/').then(function(result){
            $scope.serverConnection = "Connection OK";
        },
        function(err){
            $scope.serverConnection = "Connection fail";
        });

    }
});
