angular.module('myApp').controller('loginController',['$scope', '$http', '$stateParams','$location', '$rootScope','$state', function($scope, $http, $stateParams, $location, $rootScope,$state) {
    $scope.inputs = {};
    $rootScope.user = '';
    $rootScope.loggedIn = false;
    

    $scope.submit = function(inputs){
        $scope.inputs = inputs;
        $http.post('/api/login',$scope.inputs).then(function(response){
            
            if(response.status == 200){
                localStorage.setItem('id',response.data.resource.id)
                localStorage.setItem('user',response.data.resource.name);
                $rootScope.user = localStorage['user'];
                    $rootScope.id = localStorage['id'];
             
                localStorage.setItem('loggedIn',true);
                $rootScope.loggedIn = localStorage['loggedIn'];
               
                $state.go('posts');

            }

           
        },
        function(response){
            $rootScope.messages = response.data;
            
        });
        
        
    }
    $rootScope.user = localStorage['user'];
    $rootScope.id = localStorage['id'];
    $rootScope.loggedIn = localStorage['loggedIn'];
    $scope.logout = function() {
        localStorage.clear();
        
        
         $rootScope.loggedIn = false;
        $state.go('index');
        
    };


}]);