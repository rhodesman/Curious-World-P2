(function (ng) {
    "use strict";

    ng.module("app")
        .directive("scrollFade", function($window) {
          return function(scope, element, attrs) {

          var ngWindow = angular.element($window);
          var offset = 100;

          function scrollAndFade(){
            var top_of_element = element.offset().top + offset;
            var bottom_of_window = ngWindow.scrollTop() + $window.innerHeight;

            if (top_of_element < bottom_of_window) {
              element[0].style.opacity = 1;
            } else {
              element[0].style.opacity = 0;
            }
          }

          var betterScroll = _.debounce(scrollAndFade, 50);

          ngWindow.bind("scroll", function(){
            window.requestAnimationFrame(betterScroll);
          });

          };
        });
}(window.angular));
