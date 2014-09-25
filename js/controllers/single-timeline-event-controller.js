(function (ng, $) {
	"use strict";

	ng.module("app")
        .controller("SingleTimelineEventController", [
            "$scope",
            "$route",
            "TimelineEventService",
            'AuthenticateJS',
            function ($scope, $route, TimelineEventService) {
                $scope.event = $scope.$parent.event;
                $scope.isConfirming = null;
                $scope.uploadedImage = null;

                // Handle dropzone
                $scope.$watch("dropzone", function (dropzone) {
                    if (dropzone) {
                        ng.element(dropzone.element).on("$destroy", function () {
                            dropzone.destroy();
                        });

                        dropzone.on("thumbnail", function (file, thumbnail) {
                            $scope.uploadedImage = thumbnail;
                        });
                    }
                });

                // Keep uploadedImage synced with the event's image
                $scope.$watch("uploadedImage", function (uploadedImage, oldValue) {
                    if (uploadedImage && uploadedImage !== oldValue) {
                        if ($scope.event) {
                            $scope.event.media = uploadedImage;
                        }

                        $scope.updateEvent();
                    }
                });

                $scope.startUpload = function () { // Start the upload process
                    if (AuthenticateJS.isLoggedIn()) {
                        if ($scope.dropzone) {
                            $scope.dropzone.hiddenFileInput.click();
                        }
                    }else{
                        console.log("User not logged in to upload");
                    }
                };

                $scope.removeMedia = function () { // Remove media from timeline event
                    if ($scope.event) {
                        $scope.event.media = "";
                    }

                    $scope.updateEvent();
                    $scope.isConfirming = false;

                    // Temporary workaround
                    $("body > [id^=timeline-media]").foundation("reveal", "close");
                };

                $scope.updateEvent = function () { // Update the timeline event
                    if ($scope.event) {
                        TimelineEventService.update($scope.event);
                    }
                };
            }
        ]);
}(window.angular, window.jQuery));
