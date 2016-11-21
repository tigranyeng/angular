angular.module('myApp').controller('postController',
    ['$scope', '$http', '$state','$location', '$rootScope','Upload', function($scope, $http, $state, $location, $rootScope, Upload) {
			
    if($state.current.name == 'posts')
    {
        $http.get('/api/posts').then(function(response){
		  $scope.posts = response.data.posts;    	
    	})  
    }

    else if($state.current.name == 'show')
    {  	

        $http.get('/api/posts/' + $state.params.id).then(function(response){

    		$rootScope.post = response.data.post;
            $scope.permisions = function(){
      
                return $scope.post.user_id == $rootScope.id;
            }
    	})

    }	

    else if($state.current.name == 'my_posts')
    {
        $http.get('/api/my_posts').then(function(response){
	        $scope.posts = response.data.posts;    	
    	})  
    }

    else if($state.current.name == 'posts_create')
    {
        
        $scope.uploadPic = function(file)
        {
        
            if(file)
            {
                file.upload = Upload.upload({
                    url: '/api/posts',
                    data: {title: $scope.title, image: file,content: $scope.content},
                });

                file.upload.then(function (response) 
                {
                    $state.go('posts');
                });

            }
            
        }
       
    }

    else if($state.current.name == 'post_edit')
    {
      
        $scope.uploadPic = function(file) 
        {
         
            if(file)
            {
                
                file.upload = Upload.upload({
                    url: '/api/posts/' +$state.params.id,
                    data: {_method: 'PUT',title: $scope.post.title, image: file,content: $scope.post.content},
                });

                file.upload.then(function (response) {
                    $state.go('posts');
                });

            }
            
        }
     
    }

    $scope.delete = function(){
    
        var id = $scope.post.id;
        $http.delete('/api/posts/'+id).then(function(response){
            $state.go('posts');
        }) 

    }
}]);