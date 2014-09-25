(function (ng, Dropzone) {
    "use strict";

    ng.module("ngDropzone", [])
        .directive("ngDropzone", function () {
            var defaultConfig = {
                uploadMultiple: false,
                maxFiles: 1,
                acceptedFiles: "image/*",
                clickable: true,
                thumbnailWidth: 500,
                thumbnailHeight: 500
            };

            return {
                restrict: "AE",
                template: "<div ng-transclude></div>",
                transclude: true,
                scope: {
                    dropzone: "=",
                    dropzoneConfig: "=",
                    eventHandlers: "="
                },
                link: function ($scope, element, attrs, ctrls) {
                    var dropzone = new Dropzone(element[0], ng.extend({}, defaultConfig, $scope.dropzoneConfig || {}));

                    if ($scope.eventHandlers) {
                        Object.keys($scope.eventHandlers).forEach(function (eventName) {
                            dropzone.on(eventName, $scope.eventHandlers[eventName]);
                        });
                    }

                    $scope.dropzone = dropzone;

                    element.on("$destroy", function () {
                        dropzone.destroy();
                    });
                }
            };
        });
}(window.angular, window.Dropzone));
