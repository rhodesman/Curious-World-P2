(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("freeShipping", [ '$timeout',
            function ($timeout) {
                return {
                    restrict: "AE",
                    replace: true,
                    template: '<div id="free-shipping">FREE SHIPPING on $25 orders!</div>',
                    link: function(scope, element, attrs) {
                      $timeout(function() {
                          $('#free-shipping').animate({
                              opacity: 1,
                              top: '-=20'
                          }, {
                            duration: '500',
                            easing: 'swing'
                          });
                      }, 2000);
                    }
                };
            }
        ]);
}(window.angular, window.jQuery));
