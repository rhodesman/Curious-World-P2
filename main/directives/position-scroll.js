(function (ng) {
    "use strict";

    ng.module("app")
        .directive("positionScroll", function($window, $timeout) {
          return function(scope, element, attrs) {

          $timeout(function(){

            var ngWindow = angular.element($window);

            function scrollAndPosition(){
              var offset = 240;
              var cards = document.getElementById("cards");
              var cardHeight = 515;//update this to element height
              var bottom_of_cards = cards.offsetTop + cardHeight + offset;
              var top_of_element = ngWindow.scrollTop() + element.offset().top;

              console.log('bottom of cards:' + bottom_of_cards);
              console.log('top of element:' + top_of_element);

              if (top_of_element >= bottom_of_cards) {
                element[0].style.position = 'static';
              } else {
                element[0].style.position = null;
                element[0].style.bottom = null;
              }
            }

            scrollAndPosition();

            ngWindow.bind("scroll", function(){
              scrollAndPosition();
            });

          }, 0);



          };
        });
}(window.angular));
