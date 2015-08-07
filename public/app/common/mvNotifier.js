// Wrap toastr inside a service
angular.module('app').value('mvToastr', toastr);

// notifier service based on toastr service
angular.module('app').factory('mvNotifier', function(mvToastr) {
    "use strict";

    return {
        notify: function(msg) {
            mvToastr.success(msg);
            console.log(msg);
        }
    }
});

