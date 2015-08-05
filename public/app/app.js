angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    // this has been updated from html5Mode(true)
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main',
            controller: 'mainCtrl'
        });
});

// move controller to own file later
angular.module('app').controller('mainCtrl', function($scope){
    $scope.myVar = "Hello Angular";

});