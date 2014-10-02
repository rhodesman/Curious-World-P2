(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "slick", "duParallax"])
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
            function ($scope, $rootScope, $routeParams, AuthCheck, slick, parallaxHelper) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

              $scope.background = parallaxHelper.createAnimator(-0.3);

            }
        ]);
}(window.angular));
