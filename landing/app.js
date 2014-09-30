(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "angularBetterPlaceholder"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "landing/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "landing";
                $rootScope.pageTitle = "Curiosity World";
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "$routeParams",
            "domains",
            "authCheck",
            function ($scope, $routeParams, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                //controller
            }
        ]);
}(window.angular));
