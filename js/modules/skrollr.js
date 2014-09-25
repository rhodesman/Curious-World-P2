(function (ng, skrollr) {
    "use strict";

    ng.module("ngSkrollr", [])
        .directive("skrollr", [
            "$timeout",
            function ($timeout) {
                var done = false;
                var directiveDefinitionObject = {
                    link: function ($scope, element, attrs) {
                        $timeout(function () {
                            var scrollerHandler = skrollr.init({
                                edgeStrategy: "ease",
                                forceHeight: true,
                                smoothScrolling:true,
                                easing: {
                                    sin: function (p) {
                                        return (Math.sin(p * Math.PI * 2 - Math.PI / 2) + 1) / 2;
                                    },
                                    cos: function (p) {
                                        return (Math.cos(p * Math.PI * 2 - Math.PI / 2) + 1) / 2;
                                    }
                                },
                                beforerender:
                                    function(data)
                                    {
                                        return false;//data.curTop > data.lastTop;
                                    }
                                ,
                                render:
                                    function(data)
                                    {
                                        return true;
                                    }
                            });

                            element.on("$destroy", function () {
                                scrollerHandler.destroy();
                            });

                            $scope.$on('GotoBottom', function() {
                                scrollerHandler.animateTo(2500,{duration:4000,easing:'swing',interruptible: true});
                            });
                        }, 500);
                    }
                };

                return directiveDefinitionObject;
            }
        ]);
}(window.angular, window.skrollr));
