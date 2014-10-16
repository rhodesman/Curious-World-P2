(function (ng) {
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

                ngWindow.bind("scroll", function() {
                  var scroll = ngWindow.scrollTop();
                  console.log(scroll);

                  if(scope.open === true){
                    element[0].style.top = 0;
                  } else{
                    element[0].style.top = (600 - scroll) + 'px';
                  }

                });

                scope.moveUp = function(){
                  element[0].style.top = 0;
                  scope.open = true;
                };

                scope.moveDown = function(){
                  element[0].style.top = null;
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
}(window.angular));


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
