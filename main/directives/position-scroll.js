(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("positionScroll", function($window, $timeout) {
          return function(scope, element, attrs) {

          $timeout(function(){

            var ngWindow = angular.element($window);

            function scrollAndPosition(){
              var offset = 72;
              var cards = document.getElementById('static-milestones');
              var bottom_of_cards = cards.offsetTop + 72;
              var top_of_element = element.offset().top;

              console.log('bottom of cards:' + bottom_of_cards);
              console.log('top of element:' + top_of_element);

              if (top_of_element >= bottom_of_cards) {
                console.log('top of element greater');
                element[0].style.opacity = 0;
              } else {
                element[0].style.opacity = 1;
                element[0].style.position = null;
                element[0].style.bottom = null;
              }
            }

            scrollAndPosition();

            ngWindow.bind("scroll", function(){
              scrollAndPosition();
            });

            ngWindow.bind("resize", function(){
              scrollAndPosition();
            });

          }, 0);



          };
        });
}(window.angular, window.jQuery));
