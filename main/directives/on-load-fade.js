(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("onLoadFade", function($window) {
          return function(scope, element, attrs) {
            element[0].style.opacity=1;
          };
        });
}(window.angular, window.jQuery));
