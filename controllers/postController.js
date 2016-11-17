angular.module('myApp').controller('postController',
	['$scope', '$http', '$state','$location', '$rootScope', function($scope, $http, $state, $location, $rootScope) {
	//show all posts		
  if($state.current.name == 'posts'){
        $http.get('/api/posts').then(function(response){
    		$scope.posts = response.data.posts;    	
    	})  
    }
  else if($state.current.name == 'show'){  	
  	$http.get('/api/posts/' + $state.params.id).then(function(response){
  		$scope.post = response.data.post;
  	})
  }	
}]);