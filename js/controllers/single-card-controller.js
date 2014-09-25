(function (ng) {
    "use strict";

    ng.module("app")
        .controller("SingleCardController", [
            "$scope",
            "TimelineEventService",
            'AuthenticateJS',
            function ($scope, TimelineEventService) {
                $scope.item = $scope.$parent.$parent.listItem.item; // Temporary workaround
                $scope.event = null;
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

                // Keep synced with the correct timeline item
                $scope.$watch("item", function (item) {
                    if (item && (!$scope.event || $scope.event.item !== item)) {
                        $scope.event = null;
                        $scope.isComplete = null;

                        TimelineEventService.get({ type: "card", item: $scope.item.id }).then(function (event) {
                            if (event && event.length) {
                                $scope.event = event[0];
                            }
                        });
                    }
                });

                // Keep uploadedImage synced with the event's image
                $scope.$watch("uploadedImage", function (uploadedImage, oldValue) {
                    if (uploadedImage && uploadedImage !== oldValue) {
                        if ($scope.event) {
                            $scope.event.media = uploadedImage;
                        }

                        $scope.createEvent(); // Update the event's image
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

                $scope.createEvent = function () { // Create or update an event
                    if ($scope.event) {
                        // Update event
                        TimelineEventService.update($scope.event);
                    } else {
                        // Create event
                        TimelineEventService.add({
                            user: 1,
                            type: "card",
                            date: Date.now(),
                            item: $scope.item,
                            media: $scope.uploadedImage
                        }).then(function (event) {
                            $scope.event = event;
                        });
                    }
                };

                $scope.removeEvent = function () { // Remove the event
                    if ($scope.event) {
                        TimelineEventService.remove($scope.event).then(function () {
                            $scope.event = null;
                        });
                    }
                };
            }
        ]);
}(window.angular));
