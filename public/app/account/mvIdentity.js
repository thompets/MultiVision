angular.module('app').factory('mvIdentity', function($window, mvUser){
    "use strict";

    var currentUser;
    if(!!$window.bootstrappedUserObject){
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});