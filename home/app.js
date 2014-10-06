(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "slick", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "home/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "home";
                $rootScope.pageTitle = "Home";
            }
        ])
        .controller("DefaultController", [
            "parallaxHelper",
            "$scope",
            "$rootScope",
            "$routeParams",
            "authCheck",
            function (parallaxHelper, $scope, $rootScope, $routeParams, AuthCheck, slick) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

              // parallax background-position scroll custom setup
              $scope.positionBackground = function(elementPosition) {
                var factor = -0.4;
                var pos = (elementPosition.elemY*factor);
                return {
                   backgroundPosition: '0px ' + pos + 'px'
                };
              };
            }
        ])
        .directive("scrollFade", function($window) {
          return function(scope, element, attrs) {

          var ngWindow = angular.element($window);
          var offset = 100;


          // function scrollAndFade(){
          //   var top_of_element = element.offset().top + offset;
          //   var bottom_of_window = ngWindow.scrollTop() + $window.innerHeight;
          //
          //   if (top_of_element < bottom_of_window) {
          //     element[0].style.opacity = 1;
          //   } else {
          //     element[0].style.opacity = 0;
          //   }
          //   scope.$apply();
          // }
          //
          // var betterScroll = _.debounce(scrollAndFade, 50);
          //
          // ngWindow.bind("scroll", function(){
          //   window.requestAnimationFrame(betterScroll);
          // });

          };
        });
        // .directive("magicFooter", function($window) {
        //   return function(scope, element, attrs) {
        //     angular.element($window).bind("scroll", function() {
        //       var scroll = $(window).scrollTop();
        //       if (scroll > 50) {
        //         element.css('bottom', 0);
        //       }
        //       scope.$apply();
        //     });
        //   };
        // });
}(window.angular));
