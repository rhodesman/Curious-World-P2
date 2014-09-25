(function (ng) {
	"use strict";

	ng.module("app")
        .controller("NavController", [
            "$scope",
            "$location",
            function ($scope, $location) {
                $scope.isActive = function (route) {
                    return route === $location.path();
                };
            }
        ]);
}(window.angular));
