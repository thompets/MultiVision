angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider){
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth){
            "use strict";

            return mvAuth.authorizeCurrentUserForRoute('admin');
            }
        }
    };

    // this has been updated from html5Mode(true)
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/main',
            controller: 'mvMainCtrl'
        })
        .when('/admin/users', {
            templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl',
            resolve: routeRoleChecks.admin
        });
});

angular.module('app').run(function($rootScope, $location){
    "use strict";

    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection === 'not authorized'){
            $location.path('/');
        }
    })

});