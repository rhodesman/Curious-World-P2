(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax", "angularBetterPlaceholder"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/sign-in", {
                        templateUrl: "account/sign-in.html",
                        controller: "AccountController"
                    })
                    .when("/sign-up", {
                        templateUrl: "account/sign-up.html",
                        controller: "AccountController"
                    })
                    .when("/manage", {
                        templateUrl: "account/manage.html",
                        controller: "AccountController"
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
            }
        ]);
}(window.angular));
