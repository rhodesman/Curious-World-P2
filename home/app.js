(function (ng) {
    "use strict";

    $(function(){

    var $window = $(window);
    var scrollTime = 1.2;
    var scrollDistance = 300;

    $window.on("mousewheel DOMMouseScroll", function(event){

    event.preventDefault();

    var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
    var scrollTop = $window.scrollTop();
    var finalScroll = scrollTop - parseInt(delta*scrollDistance);

    TweenMax.to($window, scrollTime, {
      scrollTo : { y: finalScroll, autoKill:true },
      ease: Power1.easeOut,
      overwrite: 5
    });

    });
    });

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

              //parallax background-position scroll custom setup
              $scope.positionBackground = function(elementPosition) {
                var factor = -0.4;
                var pos = elementPosition.elemY*factor;
                return {
                   backgroundPosition: '0px ' + pos + 'px'
                };
              };
            }
        ])
        .directive("scrollFade", function($window) {
          return function(scope, element, attrs) {
            angular.element($window).bind("scroll", function() {
              var bottom_of_object = $(element).offset().top + $(element).outerHeight();
              var bottom_of_window = $(window).scrollTop() + $(window).height();
              if (bottom_of_object < bottom_of_window) {
                //in view
                // element.css('opacity', 1);
                element.css('opacity', 1);
              } else {
                //outside of view
                element.css('opacity', 0);
              }
              scope.$apply();
            });
          };
        });
}(window.angular));
