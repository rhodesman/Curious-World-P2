(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "slick"])
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
            "$scope",
            "$routeParams",
            "domains",
            "authCheck",
            function ($scope, $rootScope, $routeParams, AuthCheck, slick) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

              //controller

            }
        ]);
}(window.angular));
