(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("headerReveal", function($window) {
          return function(scope, element, attrs) {
            var ngWindow = angular.element($window);
            ngWindow.bind("scroll", function() {
              var scroll = ngWindow.scrollTop();
              if (scroll > 50) {
                element[0].style.opacity = 1;
              } else{
                element[0].style.opacity = null;
              }
            });
          };
        });
}(window.angular, window.jQuery));
