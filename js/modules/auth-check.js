(function (ng, $) {
    "use strict";

    ng.module("authCheck", ["authenticate.js"])
        .factory("authCheck", [
            "$rootScope",
            "$parse",
            "$timeout",
            "AuthenticateJS",
            function ($rootScope, $parse, $timeout, AuthenticateJS) {
                var modalSelector = "#before-action-modal";

                return function ($scope) {
                    var service = this;

                    service.$scope = ($scope && $scope.hasOwnProperty("$apply")) ? $scope : $rootScope;
                    service.userInfo = AuthenticateJS;
                    service.isLoggedIn = service.userInfo.isLoggedIn;

                    service.showLogin = function () {
                        $(modalSelector).foundation("reveal", "open");
                    };

                    service.auth = function (expr, scope, event) { // Run an expression if the user is logged in
                        var isAuthenticated = service.userInfo.isLoggedIn(),
                            altExpr;

                        // Check for an alternative to showing the login modal
                        if (ng.isArray(expr)) {
                            altExpr = expr[1];
                            expr = expr[0];
                        }

                        // Check for authentication and, if failed, show login window or run alternative expression
                        if (!isAuthenticated && !altExpr) {
                            service.showLogin();
                        } else {
                            $timeout(function () {
                                service.$scope.$apply(function () {
                                    ($parse(isAuthenticated ? expr : altExpr))(scope || service.$scope, { $event: event });
                                });
                            });
                        }
                    };
                };
            }
        ]);
}(window.angular, window.jQuery));
