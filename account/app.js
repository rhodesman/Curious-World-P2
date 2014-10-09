(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/sign-in", {
                        templateUrl: "account/sign-in.html",
                        controller: "DefaultController"
                    })
                    .when("/sign-up", {
                        templateUrl: "account/sign-up.html",
                        controller: "DefaultController"
                    })
                    .when("/manage", {
                        templateUrl: "account/manage.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "account";
                $rootScope.pageTitle = "Account";
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
