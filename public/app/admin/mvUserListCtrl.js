angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){
    "use strict";

    $scope.users = mvUser.query();
});