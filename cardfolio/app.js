(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "angularMoment", "ngDropzone", "angularBetterPlaceholder","ngSocial"])
        .config([
            "$routeProvider",
            "$sceDelegateProvider",
            function ($routeProvider, $sceDelegateProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "cardfolio/default.html",
                        controller: "DefaultController"
                    });

                // Whitelist "Pluck"
                $sceDelegateProvider.resourceUrlWhitelist([
                    "self",
                    "http://*.pluck.com/**",
                    "https://*.pluck.com/**"
                ]);
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "cardfolio";
                $rootScope.pageTitle = "Cardfolio";
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "$rootScope",
            "domains",
            "authCheck",
            function ($scope, $rootScope, domains, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                // Filters
                $scope.domains = domains;
                $scope.isMediaOnly = false;

                $scope.sorting = [
                    { title: "Latest", value: "-date" },
                    { title: "Oldest First", value: "date" }
                ];

                $scope.filter = function (event) { // Filter results
                    return (!$scope.isMediaOnly || event.media) &&
                        (!$scope.selectedDomain || (event.item.domain === $scope.selectedDomain));
                };

                // Events
                $scope.filteredEvents = [];

                $scope.events = [{
                    type: "card",
                    date: new Date(),
                    thumbnail: "http://placehold.it/800x300",
                    image: "http://placehold.it/800x300",
                    item: {
                        title: "Long title of card to test wrapping styles on mobile",
                        example: "Example of doing Card",
                        description: "Description of Card",
                        domain: domains[6],
                        ageRange: [3, 4]
                    }
                }, {
                    type: "card",
                    date: new Date("5/26/14 12:00:00"),
                    thumbnail: "http://democode.pluck.com/ver1.0/content/videos/store/0/5/acf187f1-8f58-477c-98c8-dad870c3a533.MOV.large.png",
                    video: "http://democode.pluck.com/ver1.0/content/videos/store/0/5/acf187f1-8f58-477c-98c8-dad870c3a533.MOV.flv.mp4",
                    item: {
                        title: "Title of Card 2",
                        example: "Example of doing Card 2",
                        description: "Description of Card 2",
                        domain: domains[0],
                        ageRange: [3, 7]
                    }
                }, {
                    type: "card",
                    date: new Date("5/21/14 12:00:00"),
                    thumbnail: "http://placehold.it/300x400",
                    image: "http://placehold.it/300x400",
                    item: {
                        title: "Title of Card",
                        example: "Example of doing Card",
                        description: "Description of Card",
                        domain: domains[5],
                        ageRange: [3, 7]
                    }
                }, {
                    type: "badge",
                    date: new Date("5/16/14 12:00:00"),
                    item: {
                        title: "Badge earned!"
                    }
                }, {
                    type: "card",
                    date: new Date("5/16/14 12:00:00"),
                    item: {
                        title: "Title of Card",
                        example: "Example of doing Card",
                        description: "Description of Card",
                        domain: domains[4],
                        ageRange: [3, 7]
                    }
                }, {
                    type: "card",
                    date: new Date("5/1/14 12:00:00"),
                    item: {
                        title: "Title of Card",
                        example: "Example of doing Card",
                        description: "Description of Card",
                        domain: domains[3],
                        ageRange: [5, 6]
                    }
                }];

                // Give events IDs since $index is unreliable when using filters
                $scope.events.forEach(function (event, i) {
                    event.id = i + 1;
                    $scope.events[i] = event;
                });

                // Determine the contentClass by the filtered events
                $scope.$watchCollection(
                    "[isMediaOnly, selectedDomain, selectedSorting, isLoggedIn()]",
                    function () {
                        var domain = ($scope.selectedDomain && $scope.selectedDomain.name)
                            || (!$scope.isLoggedIn() && "default")
                            || ($scope.filteredEvents.length && $scope.filteredEvents[$scope.filteredEvents.length - 1].item.domain.name)
                            || "default";

                        $rootScope.contentClass = "domain-" + domain;
                    }
                );
            }
        ]);
}(window.angular));
