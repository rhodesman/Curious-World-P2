(function (ng, $) {
    "use strict";

    var ngTraversableListController = [
        "$scope",
        "$timeout",
        function ($scope, $timeout) {
            var lastListItem,
                thisListItem;

            $scope.linkedList = [];
            $scope.activeListItem = null;
            $scope.lastItem = null;
            $scope.animationTime = 600;
            $scope.isForward = true;

            // Update item list
            $scope.$watch("items", function (items) {
                $scope.linkedList = [];

                if (items && items.length) {
                    // Build item list
                    if ($scope.hasOwnProperty("items")) {
                        items.forEach(function (item) {
                            thisListItem = {
                                item: item,
                                prev: null,
                                next: null
                            };

                            // Connect this item to the last item
                            if (lastListItem) {
                                thisListItem.prev = lastListItem;
                                lastListItem.next = thisListItem;
                            }

                            $scope.linkedList.push(thisListItem);
                            lastListItem = thisListItem;
                        });
                    }

                    // Connect first and last items
                    $scope.linkedList[0].prev = lastListItem;
                    lastListItem.next = $scope.linkedList[0];
                }
            });

            // Update active item
            $scope.$watchCollection("[activeItem, linkedList]", function (newValues) {
                var activeItem = newValues[0];

                if (activeItem) {
                    $scope.linkedList.every(function (listItem) {
                        if (activeItem === listItem.item) {
                            $scope.lastItem = $scope.activeListItem;
                            $scope.activeListItem = listItem;

                            $timeout($scope.clearLastItem, $scope.animationTime);

                            return false;
                        }

                        return true;
                    });
                }
            });

            $scope.go = function (listItem, isNext) { // Change active item
                if (!$scope.lastItem) {
                    $scope.activeItem = listItem.item;
                    $scope.isForward = !!isNext;
                }
            };

            $scope.clearLastItem = function () { // Clear the last item
                $scope.lastItem = null;
            };
        }
    ];

    ng.module("app")
        .directive("ngTraversableList", [
            function () {
                return {
                    restrict: "AE",
                    transclude: true,
                    controller: ngTraversableListController,
                    scope: {
                        items: "=ngTraversableList",
                        itemTemplate: "=",
                        activeItem: "="
                    },
                    template: '<div ng-transclude></div><ul class="items" ng-class="{ \'is-empty\': !linkedList.length, \'backward\': !isForward, \'forward\': isForward }"><li class="item" ng-repeat="listItem in linkedList track by listItem.item.id" ng-class="{ \'is-active\': listItem === activeListItem, \'is-last\': listItem === lastItem }" ng-include="itemTemplate"></li></ul><div class="item-navigation"><a class="prev" href="" ng-click="go(activeListItem.prev)" ng-if="activeListItem.prev">Previous</a><a class="next" href="" ng-click="go(activeListItem.next, true)" ng-if="activeListItem.next">Next</a></div>'
                };
            }
        ]);
}(window.angular, window.jQuery));
