(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute"])
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
            "$scope",
            "$rootScope",
            "$routeParams",
            "authCheck",
            function ($scope, $rootScope, $routeParams, AuthCheck) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

              //controller

            }
        ]);
}(window.angular));
