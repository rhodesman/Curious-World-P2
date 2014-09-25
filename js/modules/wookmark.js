(function (ng, $) {
    "use strict";

    ng.module("ngWookmark", [])
        .directive("wookmark", [
            "$timeout",
            function ($timeout) {
                // These are based on foundation
                var breakpoints = { // Window width breakpoints
                        small: 640,
                        medium: 1024,
                        large: 1920
                    },
                    breakpointNames = ["small", "medium", "large"], // Breakpoint names for clear configuration objects
                    $window = $(window);

                return {
                    scope: {
                        wookmark: "=",
                        options: "=",
                        columns: "=",
                        widths: "="
                    },
                    link: function ($scope, element) {
                        var currentBreakpoint = null,
                            options = ng.extend({ // General options
                                columns: ng.extend({
                                    small: 1,
                                    medium: 2,
                                    large: 3
                                }, $scope.columns),
                                widths: $scope.widths || null
                            }, $scope.options || {}),
                            wookmarkOptions = ng.extend({ // Wookmark specific options
                                align: "center",
                                autoResize: true,
                                container: element
                            }, $scope.wookmark || {}),
                            wookmarkIt = function () { // Apply Wookmark options
                                element.children().wookmark(wookmarkOptions);
                            },
                            resize = function () { // Update wookmark options when window reaches a new breakpoint
                                var newBreakpoint = breakpointNames[breakpointNames.length - 1],
                                    windowWidth = $window.width(),
                                    columns;

                                // Determine the current breakpoint
                                breakpointNames.every(function (breakpointName) {
                                    if (windowWidth <= breakpoints[breakpointName]) {
                                        newBreakpoint = breakpointName;
                                        return;
                                    }
                                });

                                // Update the Wookmark options if the window reaches a new breakpoint
                                if (newBreakpoint !== currentBreakpoint) {
                                    currentBreakpoint = newBreakpoint;

                                    // Set the flexible width based on columns
                                    columns = (options.columns && options.columns[currentBreakpoint]);
                                    wookmarkOptions.flexibleWidth = (100 / Math.max(columns, 1)) + "%";

                                    // Set the item width based on configuration, both breakpoint-based and static
                                    wookmarkOptions.itemWidth = (options.widths && options.widths[currentBreakpoint])
                                        || options.itemWidth
                                        || (breakpoints[breakpointNames[0]] / 2);

                                    wookmarkIt();
                                }
                            };

                        // Respond to resizing
                        $window.resize(resize);
                        element.imagesLoaded(function () {
                            $timeout(resize, 0);
                            $timeout(wookmarkIt, 1000); // Just in case
                        });
                    }
                };
            }
        ]);
}(window.angular, window.jQuery));
