(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "learning-areas/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "learning-areas";
                $rootScope.pageTitle = "Learning Areas";
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

              // parallax background-position scroll custom setup
              $scope.positionBackground = function(elementPosition) {
                var factor = -0.4;
                var pos = (elementPosition.elemY*factor);
                return {
                   backgroundPosition: '0px ' + pos + 'px'
                };
              };

            }
        ]);
}(window.angular));
