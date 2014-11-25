(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "blog/default.html",
                        controller: "DefaultController"
                    })
                    .when("/post", {
                        templateUrl: "blog/single-post.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "blog";
                $rootScope.pageTitle = "Curious World Blog";
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "$rootScope",
            "$routeParams",
            "authCheck",
            function ($scope, $rootScope, $routeParams, AuthCheck) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

            }
        ]);
}(window.angular));
