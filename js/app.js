(function (ng, $) {
    "use strict";

    // Foundation
    $(function () {
        var wrapper,
            activeClassName = "reveal-is-open",
            events = ["open", "close"];

        $(document)
            .foundation()
            .on(events.join(" "), "[data-reveal]", function (e) {
                wrapper.toggleClass(activeClassName, e && e.type === events[0]);
            })
            .ready(function () {
                wrapper = $("#wrapper");
            });
    });


    // Angular
    ng.module("app", ["ngRoute", "ngResource", "angularMoment", "reusable", "authenticate.js", "LocalStorageModule", "ngAnimate", "dotdotdot-angular", "$timeout"])
        .constant("ages", [3, 4, 5, 6, 7])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'home/default.html',
                        title: "Home",
                        reloadOnSearch: false
                    })
                    .when('/kidfolio/:domainName?', {
                        templateUrl: 'partials/kidfolio.html',
                        controller: "KidfolioController",
                        title: "Kidfolio"
                    })
                    .when('/mykiddid', {
                        templateUrl: 'partials/mykiddid.html',
                        title: "My Kid Did"
                    })
                    .when('/curiositykits', {
                        templateUrl: 'partials/curiosity-kits.html',
                        controller: "CuriosityKitsController",
                        title: "Curiosity Kits"
                    })
                    .when('/curiositykits/:kit', {
                        templateUrl: 'partials/single-curiosity-kit.html',
                        controller: "SingleCuriosityKitController",
                        title: "Curiosity Kits"
                    })
                    .when('/curiousworldapp', {
                        templateUrl: 'partials/curiousworldapp.html',
                        title: "Curious World App"
                    })
                    .when('/privacy-policy', {
                        title: "Privacy Policy"
                    })
                    .when('/terms-of-use', {
                        title: "Terms"
                    })
                    .when('/faq', {
                        title: "Frequently Asked Questions"
                    })
                    .when('/landing', {
                        title: "Landing"
                    })
                    .when('/:domainName', {
                        templateUrl: 'partials/cards.html',
                        controller: 'CardsController',
                        title: "Learn",
                        reloadOnSearch: false
                    })
                    .when('/learning-areas', {
                        title: "Learning"
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
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
        ]).config([
            "localStorageServiceProvider",
            function (localStorageServiceProvider) {
                localStorageServiceProvider.setPrefix("CuriousWorld");
            }
        ]).run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
                    if (current.$$route) {
                        $rootScope.pageTitle = current.$$route.title || "";
                    } else {
                        $rootScope.pageTitle = "";
                    }
                });
            }
        ]);
}(window.angular, window.jQuery));
