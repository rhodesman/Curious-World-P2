(function (ng) {
    "use strict";

    ng.module("app")
        .config([
            "$provide",
            function ($provide) {
                // Prepare the system to use mock API requests -- TODO: Remove when API is ready
                $provide.decorator("$httpBackend", ng.mock.e2e.$httpBackendDecorator);
            }
        ]).run([
            "$httpBackend",
            function ($httpBackend) {
                // Determine requests that can be handled
                var requestTypes = ["GET", "POST", "DELETE", "PUT"];

                // Handle requests
                $httpBackend.whenPOST("/upload").respond({
                    success: true
                });

                $httpBackend.whenPOST().respond({
                    id: 454,
                    email: 'jim@test.cob',
                    displayName: 'Jim Test',
                    firstName: 'Jim',
                    lastName: 'Test',
                    storyVisibility: 'Public'
                  });
                //
                // $httpBackend.whenGET("api/auth/loggedin").respond({
                //     id: 454,
                //     email: 'jim@test.cob',
                //     displayName: 'Jim Test',
                //     firstName: 'Jim',
                //     lastName: 'Test',
                //     storyVisibility: 'Public',
                //     receiveNews: true
                // });

                // Send all other requests forth
                requestTypes.forEach(function (type) {
                    $httpBackend.when(type, /[a-z0-9\/.]/i).passThrough();
                });
            }
        ]);
}(window.angular));
