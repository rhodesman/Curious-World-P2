(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("headerReveal", function($window) {
          return function(scope, element, attrs) {
            var ngWindow = angular.element($window);
            ngWindow.bind("scroll", function() {
              var scroll = ngWindow.scrollTop();
              if (scroll > 50) {
              // element.animate({opacity:1}, 500);
              element[0].style.opacity = 1;
              }
            });
          };
        });
}(window.angular, window.jQuery));
