(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "flash_demo/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "flash-demo";
                $rootScope.pageTitle = "Flash Demo";
            }
        ])
        .controller("DefaultController", [
            "parallaxHelper",
            "$scope",
            "$rootScope",
            "$routeParams",
            "authCheck",
            function (parallaxHelper, $scope, $rootScope, $routeParams, AuthCheck) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking



            }
        ]).directive('media', function($window){
            return function(scope, element, attrs) {

                var ngWindow = angular.element($window);

                // ngWindow.bind("scroll", function() {
                //   var scroll = ngWindow.scrollTop();
                //   console.log(scroll);
                //
                //   element[0].style.top = (600 - scroll) + 'px';
                //
                //   if(scope.open === true){
                //     element[0].style.top = 0;
                //   } else{
                //     console.log(element[0].style.top = (600 - scroll) + 'px');
                //   }
                //
                // });

                scope.moveUp = function(){
                  element[0].style.top = -600 + 'px';
                  element[0].style.marginBottom = -600 + 'px';
                  element[0].animate({height: '100%'}, 500);
                  // element[0].style.height = 100 + '%';
                  scope.open = true;
                  // document.body.scrollTop = document.documentElement.scrollTop = 0;

                //   function scrollToTop(scrollDuration) {
                //     var scrollStep = -window.scrollY / (scrollDuration / 15),
                //         scrollInterval = setInterval(function(){
                //         if ( window.scrollY !== 0 ) {
                //             window.scrollBy( 0, scrollStep );
                //         }
                //         else clearInterval(scrollInterval);
                //     },15);
                //   }
                //   scrollToTop(1000);
                };

                scope.moveDown = function(){
                  element[0].style.top = 0 + 'px';
                  element[0].style.marginBottom = null;
                  // element[0].style.height = null;
                  element[0].animate({height: 280}, 500);
                  scope.open = false;
                };


                // scope.viewToggle = function(){
                //   var viewToggle = true;
                //   viewToggle = !viewToggle;
                //   $scope.viewToggle = viewToggle;
                //   return scope.viewToggle;
                // };



            };

        });
}(window.angular, window.jQuery));


// var ngWindow = angular.element($window);
//
// function scroll(){
//   var top_of_element = element.offset().top + offset;
//   var bottom_of_window = ngWindow.scrollTop() + $window.innerHeight;
//
//   if (top_of_element < bottom_of_window) {
//     element[0].style.opacity = 1;
//   } else {
//     element[0].style.opacity = 0;
//   }
// }
//
// ngWindow.bind("scroll", function(){
//   window.requestAnimationFrame(betterScroll);
// });
