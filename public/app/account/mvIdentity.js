angular.module('app').factory('mvIdentity', function(){
    "use strict";

    return {
        currentUser: undefined,
        isAuthenticated: function(){
            return !!this.currentUser;
        }
    }
});