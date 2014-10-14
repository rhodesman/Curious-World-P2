(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "duParallax"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/sign-in", {
                        templateUrl: "account/sign-in.html",
                        controller: "AccountController"
                    })
                    .when("/sign-up", {
                        templateUrl: "account/sign-up.html",
                        controller: "AccountController"
                    })
                    .when("/manage", {
                        templateUrl: "account/manage.html",
                        controller: "AccountController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "account";
                $rootScope.pageTitle = "Account";
            }
        ])
        .controller("DefaultController", [
            "parallaxHelper",
            "$scope",
            "$rootScope",
            "$routeParams",
            "authCheck",
            function (parallaxHelper, $scope, $rootScope, $routeParams, AuthCheck) {
              ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking
            }
        ]).config([
            'AuthenticateJSProvider',
            function (AuthenticateJSProvider) {
                AuthenticateJSProvider.setConfig({
                    host: 'api/',                  // your base api url
                    loginUrl: 'auth/login',        // login api url
                    logoutUrl: 'auth/logout',      // logout api url
                    loggedinUrl: 'auth/loggedin',  // api to get the user profile and roles

                    unauthorizedPage: '/unauthorized',  // url (frontend) of the unauthorized page
                    targetPage: '/',           // url (frontend) of the target page on login success
                    loginPage: '/login',                 // url (frontend) of the login page
                    signupUrl: 'auth/signup',       // signup api url
                    deleteAccountUrl: 'auth/deleteAccount', //deleteaccount api url
                    updateAccountUrl: 'auth/updateProfile' //updateprofile api url
                });
            }
        ]);
}(window.angular));
