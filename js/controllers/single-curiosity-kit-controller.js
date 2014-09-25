(function (ng, skrollr) {
    "use strict";

    ng.module("app")
        .controller("SingleCuriosityKitController", [
            "$scope",
            "$routeParams",
            "$location",
            "$anchorScroll",
            "CuriosityKitService",
            function ($scope, $routeParams, $location, $anchorScroll, CuriosityKitService) {
                $scope.kit = null;

                $scope.slides = [
                    {image: 'http://placehold.it/1600x800/c8c8c8', thumbnail: 'http://placehold.it/200x100/c8c8c8', description: 'Image 00'},
                    {image: 'http://placehold.it/1600x800/afafaf', thumbnail: 'http://placehold.it/200x100/afafaf', description: 'Image 01'},
                    {image: 'http://placehold.it/1600x800/959595', thumbnail: 'http://placehold.it/200x100/959595', description: 'Image 02'},
                    {image: 'http://placehold.it/1600x800/808080', thumbnail: 'http://placehold.it/200x100/808080', description: 'Image 03'},
                    {image: 'http://placehold.it/1600x800', thumbnail: 'http://placehold.it/200x100/808080', description: 'Image 04'},
                    {image: 'http://placehold.it/1600x800', thumbnail: 'http://placehold.it/200x100/808080', description: 'Image 05'}
                ];

                $scope.currentIndex = 0;

                $scope.setCurrentSlideIndex = function (index) {
                    $scope.currentIndex = index;
                };

                $scope.isCurrentSlideIndex = function (index) {
                    return $scope.currentIndex === index;
                };

                // Get the kit
                CuriosityKitService.get({ id: $routeParams.kit }).then(function (kit) {
                    $scope.kit = kit;
                })["catch"](function () { // Redirect back to selection page if no kit was found
                    $location.path("/curiositykits");
                });

                // Fix scroll position
                $anchorScroll();
            }
        ])
        .directive("skrollr", [
            "$timeout",
            function ($timeout) {
                var directiveDefinitionObject = {
                    link: function ($scope, element, attrs) {
                        $timeout(function () {
                            var scrollerHandler = skrollr.init({
                                edgeStrategy: "ease",
                                easing: {
                                    sin: function (p) {
                                        return (Math.sin(p * Math.PI * 2 - Math.PI / 2) + 1) / 2;
                                    },
                                    cos: function (p) {
                                        return (Math.cos(p * Math.PI * 2 - Math.PI / 2) + 1) / 2;
                                    }
                                }
                            });

                            element.on("$destroy", function () {
                                scrollerHandler.destroy();
                            });
                        }, 500);
                    }
                };

                return directiveDefinitionObject;
            }
        ]);

}(window.angular, window.skrollr));
