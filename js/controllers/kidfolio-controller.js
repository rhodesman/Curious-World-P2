(function (ng) {
	"use strict";

	ng.module("app")
        .controller("KidfolioController", [
            "$scope",
            "$location",
            "$routeParams",
            "DomainService",
            "TimelineEventService",
            function ($scope, $location, $routeParams, DomainService, TimelineEventService) {
                $scope.domains = null;
                $scope.selectedDomain = null;
                $scope.isMediaOnly = $location.search().media || false;

                // Filter timeline items
                $scope.filter = function (event) {
                    return !($scope.selectedDomain && (event.item.domain.id !== $scope.selectedDomain.id))
                        && !($scope.isMediaOnly && !event.media);
                };

                // Update query string
                $scope.$watch("isMediaOnly", function (isMediaOnly) {
                    $location.search("media", isMediaOnly || null);
                });

                // Get domain data
                DomainService.get().then(function (domains) {
                    $scope.domains = domains;
                });

                DomainService.get({ name: $routeParams.domainName }).then(function (domain) {
                    $scope.selectedDomain = domain;
                })["finally"](function () {
                    // Update path
                    $scope.$watch("selectedDomain", function (domain) {
                        if (domain && domain.hasOwnProperty("name")) {
                            $routeParams.domainName = domain.name;
                            $location.path("/kidfolio/" + $routeParams.domainName).replace();
                        } else {
                            $location.path("/kidfolio");
                        }
                    });
                });

                // Get timeline data
                TimelineEventService.get({ user: 1 }).then(function (timelineEvents) {
                    $scope.timeline = timelineEvents;
                });
            }
        ]);
}(window.angular));
