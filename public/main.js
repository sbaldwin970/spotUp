angular.module('spotUp', ['ngRoute', 'ui.bootstrap'])

var mainController = function($scope, $http, $uibModal, $sce) {
	$scope.stateSelect = "CO";
	var vidsArray = [];


	$http.get('/api/spots').then(function(res){
		$scope.spots = res.data;

		for (var i = 0; i < $scope.spots.length; i++) {
			$scope.loadLeaderboard($scope.spots[i]);
		}
	})
	$http.get('/api/me').then(function(returnData) {
		$scope.user = returnData.data;
	})
	$http.get('/api/submissions/' + $scope.userSubmitted)
	.then(function(returnData){
		$scope.userVids = returnData.data
		//console.log($scope.myReviews)

	})
	$scope.$sce = $sce
    $scope.display = function(spot) {
    	$scope.spot = spot;
    	console.log(spot)
    	var modalInstance = $uibModal.open({
      		animation: $scope.animationsEnabled,
      		templateUrl: 'spotDisplay.html',
      		controller: 'spotDisplayController',
      		resolve: {
      			spot: function() {
      				return spot;

      			}, 
      			$sce: function() {
      				return $sce;
      			},
      			vidsArray: function() {
      				return vidsArray;
      			}
      		}
    	})
    },

    $scope.otherDisplay = function(spot) {
    	$scope.spot = spot;
    	console.log(spot)
    	var modalInstance = $uibModal.open({
      		animation: $scope.animationsEnabled,
      		templateUrl: 'profile.html',
      		controller: 'otherDisplayController',
      		resolve: {
      			spot: function() {
      				return spot;

      			}, 
      			$sce: function() {
      				return $sce;
      			},
      			vidsArray: function() {
      				return vidsArray;
      			}
      		}
    	})
    }

    $scope.loadLeaderboard = function(spot) {

    	$http.get("/api/sort/" + spot._id).then(function(res) {
    		spot.leaderBoard = res.data;
    		console.log(res.data);
    	})
    }
}
   
 var spotDisplayController = function(spot, $sce, $scope, $http, vidsArray){
	$scope.spot = spot;
	$scope.vidsArray = [];
	$scope.videoUrl = "";
	$scope.sce = $sce;
	$http.get('/api/me').then(function(returnData) {
		$scope.user = returnData.data;
	});
	$http.get('/api/submissions/' + $scope.spot._id).then(function(res) {
		$scope.vidsArray = res.data;
		console.log(res.data)
	});
	    $scope.submitRating = function(video, scoreSelect) {
		console.log(video, scoreSelect)
		$http.post('/api/rate', {
			submissionId: video._id, x: parseInt(scoreSelect)
		})
    	}
	$scope.display = function() {
		$http.post('/api/upload',{videoUrl: $scope.videoUrl, spot: $scope.spot}).then(function(returnData) {
			$scope.vidsArray.push(returnData.data)
		})

	},

	$scope.getEmbedUrlFromVideoId = function(videoId) {
		return 'http://youtube.com/embed/' + videoId
	};
} 



var otherDisplayController = function(spot, $sce, $scope, vidsArray, $http){
	$scope.spot = spot;
	$scope.vidsArray = [];
	$scope.videoUrl = "";
	$scope.sce = $sce;
	$http.get('/api/me').then(function(returnData) {
		$scope.user = returnData.data;
	});
	$http.get('/api/submissions/' + $scope.spot._id).then(function(res) {
		$scope.vidsArray = res.data;
		console.log(res.data)
	});
	$scope.display = function() {
		$http.post('/api/upload',{videoUrl: $scope.videoUrl, spot: $scope.spot}).then(function(returnData) {
			$scope.vidsArray.push(returnData.data)
		})

	}
	$scope.getEmbedUrlFromVideoId = function(videoId) {
		return 'http://youtube.com/embed/' + videoId
	};
}

angular.module('spotUp')
	.controller('mainController', mainController)
	.controller('spotDisplayController', spotDisplayController);







