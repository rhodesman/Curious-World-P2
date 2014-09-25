(function (ng) {
    "use strict";

    ng.module("app")
        .controller("CuriosityKitsController", [
            "$scope",
            "$routeParams",
            "$location",
            "$anchorScroll",
            "CuriosityKitService",
            function ($scope, $routeParams, $location, $anchorScroll, CuriosityKitService) {
                $scope.kits = null;

                $scope.slides = [
                    {image: 'http://placehold.it/1600x800/c8c8c8', thumbnail: 'http://placehold.it/200x70/c8c8c8', description: 'Image 00'},
                    {image: 'http://placehold.it/1600x800/afafaf', thumbnail: 'http://placehold.it/200x70/afafaf', description: 'Image 01'},
                    {image: 'http://placehold.it/1600x800/959595', thumbnail: 'http://placehold.it/200x70/959595', description: 'Image 02'},
                    {image: 'http://placehold.it/1600x800/808080', thumbnail: 'http://placehold.it/200x70/808080', description: 'Image 03'}
                ];

                $scope.currentIndex = 0;

                $scope.setCurrentSlideIndex = function (index) {
                    $scope.currentIndex = index;
                };

                $scope.isCurrentSlideIndex = function (index) {
                    return $scope.currentIndex === index;
                };

                // Get the kits
                CuriosityKitService.get().then(function (kits) {
                    $scope.kits = kits;
                })["catch"](function () {
                    $scope.kits = [];
                });

                // Fix scroll position
                $anchorScroll();
            }
        ]);
}(window.angular));
