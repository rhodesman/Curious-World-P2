(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "ngDropzone", "angularMoment", "ngAnimate", "angularBetterPlaceholder", "ngWookmark","ngSocial"])
        .config([
            "$routeProvider",
            //"$locationProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "community/default.html",
                        controller: "DefaultController"
                    })
                    .when("/:id", {
                        templateUrl: "community/single.html",
                        controller: "DefaultController"
                    });
                //$locationProvider.html5Mode(true).hashPrefix('!');
            }
        ])
        .run([
            "$rootScope","$location",
            function ($rootScope,$location) {
                $rootScope.activeNav = "community";
                $rootScope.pageTitle = "Community";
                $rootScope.location = $location;
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "$sce",
            "$routeParams",
            "domains",
            "authCheck",
            function ($scope, $sce, $routeParams, domains, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                // Test data
                var testComments,
                    testCompletions,
                    threeDaysAgo = new Date(),
                    fiveDaysAgo = new Date();

                threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
                fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

                testComments = [{
                    author: "Display Name",
                    date: threeDaysAgo,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere massa purus, ut varius libero dapibus a. Suspendisse facilisis velit nunc, sit amet sollicitudin diam tristique nec."
                }, {
                    author: "You",
                    date: threeDaysAgo,
                    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    isUser: true
                }];

                testCompletions = [{
                    user: {
                        name: "You"
                    },
                    date: fiveDaysAgo,
                    image: "http://placehold.it/400x400",
                    description: "Lorem ipsum dolor sit amet, consetetur adipisicing elit.",
                    comments: []
                }, {
                    user: {
                        name: "Display Name"
                    },
                    date: fiveDaysAgo,
                    image: "http://placehold.it/300x500",
                    description: "Lorem ipsum dolor sit amet, consetetur adipisicing elit!",
                    comments: testComments.slice(1).concat(testComments).concat(testComments)
                }, {
                    user: {
                        name: "Display Name"
                    },
                    date: fiveDaysAgo,
                    image: "http://placehold.it/800x400",
                    description: "Lorem ipsum dolor sit amet, consetetur adipisicing elit!",
                    comments: testComments
                }];

                // Filters
                $scope.domains = domains;

                $scope.sorting = [
                    { title: "Latest", value: "-date" },
                    { title: "Oldest First", value: "date" },
                    { title: "Most Loved", value: "" },
                    { title: "Funniest", value: "" },
                    { title: "Cutest", value: "" },
                    { title: "My Favorites", value: "" }
                ];

                $scope.categories = [
                    { title: "Family" },
                    { title: "Creativity" },
                    { title: "Inside" },
                    { title: "Outside" },
                    { title: "That's Life!" }
                ];

                $scope.likeability = [
                    { title: "Most <b>Loved</b>" },
                    { title: "Funniest" },
                    { title: "Cutest" },
                    { title: "My Favorites" }
                ];

                // Challenges
                $scope.challenges = [{
                    title: "Paper Bag Puppet",
                    date: fiveDaysAgo,
                    image: "img/home/placeholder-1.jpg",
                    description: "Make a funny character using a paper lunch bag.",
                    domain: "executive",
                    comments: testComments.concat(testComments).concat(testComments),
                    completions: testCompletions.concat(testCompletions.slice(0, 1))
                }, {
                    title: "Feeding Fluffy",
                    date: fiveDaysAgo,
                    image: "img/home/placeholder-3.jpg",
                    description: "Show one way you take care of your pet.",
                    domain: "creative",
                    comments: testComments.concat(testComments).concat(testComments),
                    completions: testCompletions.concat(testCompletions)
                }, {
                    title: "Monster Cookies",
                    date: fiveDaysAgo,
                    image: "img/home/placeholder-2.jpg",
                    description: "Make one big cookie with a crazy monster face.",
                    domain: "health",
                    comments: testComments.concat(testComments).concat(testComments).concat(testComments),
                    completions: testCompletions.slice(0, 1)
                }];

                // Challenge from URL
                if ($routeParams.hasOwnProperty("id")) {
                    $scope.challenge = $scope.challenges[$routeParams.id];
                }

                // Trust HTML in likeability
                $scope.likeability.forEach(function (likeability, i) {
                    $scope.likeability[i].title = $sce.trustAsHtml(likeability.title);
                });
            }
        ])
        .animation(".description", function () { // Community description slide-up
            var shownClass = "is-showing",
                speed = $.fx.speeds.fast,
                getPositionPercentage = function (element) {
                    return parseInt(element.css("bottom"), 10) / -element.outerHeight();
                },
                reset = function (element, callback) { // Remove "bottom" style and then run callback
                    return function () {
                        element.css({ bottom: "" });
                        return callback();
                    };
                };

            return {
                addClass: function (element, className, done) {
                    if (className === shownClass) {
                        // Set initial position if not set
                        if (!element[0].style.bottom) {
                            element.css({ bottom: -element.outerHeight() });
                        }

                        // Animate to "bottom: 0"
                        element
                            .stop()
                            .animate(
                                { bottom: 0 },
                                speed * getPositionPercentage(element),
                                reset(element, done)
                            );
                    } else {
                        return done();
                    }
                },
                removeClass: function (element, className, done) {
                    if (className === shownClass) {
                        // Set initial position if not set
                        if (!element[0].style.bottom) {
                            element.css({ bottom: 0 });
                        }

                        // Animate to "bottom: initial"
                        element
                            .stop()
                            .animate(
                                { bottom: -element.outerHeight() },
                                speed - (speed * getPositionPercentage(element)),
                                reset(element, done)
                            );
                    } else {
                        return done();
                    }
                }
            };
        });
}(window.angular, window.jQuery));
