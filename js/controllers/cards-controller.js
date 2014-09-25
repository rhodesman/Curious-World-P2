(function (ng) {
    "use strict";

    ng.module("app")
        .controller("CardsController", [
            "$scope",
            "$routeParams",
            "$location",
            "DomainService",
            "CardService",
            "TimelineEventService",
            "ages",
            function ($scope, $routeParams, $location, DomainService, CardService, TimelineEventService, ages) {
                $scope.isLoading = true;

                // Age logic
                $scope.ages = ages;
                $scope.selectedAge = null;

                // Domain logic
                $scope.domains = null;
                $scope.selectedDomain = null;
                $scope.defaultDomain = null;

                // Card logic
                $scope.cards = null;
                $scope.selectedCard = null;
                $scope.defaultCard = null;

                $scope.selectAge = function (age) { // Select an age
                    age = +age;

                    if ($scope.isInArray(age, ages)) {
                        $scope.selectedAge = age;
                    }
                };

                $scope.isInRange = function (value, range) { // Check if a value is in a range
                    return range[0] <= value && range[1] >= value;
                };

                /*jslint bitwise: true */
                $scope.isInArray = function (value, collection) { // Check if a value is in an array
                    return ~collection.indexOf(value);
                };
                /*jslint bitwise: false */

                // Determine the selected card and age from the route
                $scope.$on("$routeChangeSuccess", function () {
                    var queryVars = $location.search();

                    if (queryVars.hasOwnProperty("age")) {
                        $scope.selectAge(queryVars.age);
                    }

                    CardService.get({ id: +(queryVars.card || null) }).then(function (card) {
                        if ($scope.isInRange($scope.selectedAge, card.ageRange)) {
                            $scope.selectedCard = card;
                        }
                    }, function () {
                        // Since it failed, try to get the default card
                        var unwatch = $scope.$watch("defaultCard", function (card) {
                            $scope.selectedCard = card;

                            if ($scope.selectedCard) {
                                unwatch();
                            }
                        });
                    });
                });

                // Update route when selected card is changed
                $scope.$watch("selectedCard", function (card) {
                    if (card) {
                        $location.search("card", card.id);
                    }
                });

                // Update route when selected age is changed
                $scope.$watch("selectedAge", function (age) {
                    if (age && $scope.isInArray(age, ages)) {
                        $location.search("age", age);
                    }
                });

                // Update list of cards based on selected domain
                $scope.$watchCollection("[selectedDomain, selectedAge]", function (newValues) {
                    var domain = newValues[0],
                        age = newValues[1];

                    if (domain) {
                        $scope.isLoading = true;
                        CardService.get({ domain: domain.id }).then(function (cards) {
                            var filteredCards = [];

                            // Filter cards by age
                            cards.forEach(function (card) {
                                if ($scope.isInRange(age, card.ageRange)) {
                                    filteredCards.push(card);
                                }
                            });

                            $scope.cards = filteredCards;
                            $scope.defaultCard = filteredCards.length ? filteredCards[0] : null;
                        })["finally"](function () {
                            $scope.isLoading = false;
                        });
                    }
                });

                // Get all domains
                DomainService.get().then(function (domains) {
                    var isValidDomain = false;

                    $scope.domains = domains;
                    $scope.defaultDomain = domains[0];

                    // Validate selected domain
                    domains.every(function (domain) {
                        if ($scope.selectedDomain === domain) {
                            isValidDomain = true;
                            return false;
                        }

                        return true;
                    });

                    if (!isValidDomain) {
                        $scope.selectedDomain = null;
                        $scope.isLoading = false;
                    }
                });

                // Get selected domain
                DomainService.get({ name: $routeParams.domainName }).then(function (domain) {
                    $scope.selectedDomain = domain;
                });
            }
        ]);
}(window.angular));
