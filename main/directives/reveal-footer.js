(function (ng, $) {
    "use strict";
    ng.module("app")
      .directive("revealFooter", function($window) {
          return function(scope, element, attrs) {
            var ngWindow = angular.element($window);
            ngWindow.bind("scroll", function() {
              var scroll = ngWindow.scrollTop();
              if (scroll > 50) {
              element[0].style.bottom = 0;
              }
              else {
              element[0].style.bottom = null;
              }
            });
          };
        });
}(window.angular, window.jQuery));
