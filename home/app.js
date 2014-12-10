(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "slick", "duParallax", "angularBetterPlaceholder"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "home/default.html",
                        controller: "DefaultController"
                    })
                    .when("/sign-in", {
                        templateUrl: "home/sign-in.html",
                        controller: "AccountController",
                    })
                    .when("/sign-up", {
                        templateUrl: "home/sign-up.html",
                        controller: "AccountController"
                    })
                    .when("/manage", {
                        templateUrl: "home/manage.html",
                        controller: "AccountController"
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

              //simulate load spinner


              //create brightcover video in slider
              brightcove.createExperiences();

              // parallax background-position scroll custom setup
              $scope.positionBackground = function(elementPosition) {
                var factor = -0.4;
                var pos = Math.round(elementPosition.elemY*factor);
                return {
                   backgroundPosition: '0px ' + pos + 'px'
                };
              };
            }
        ]);
}(window.angular, window.jQuery));
