(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "ngAnimate", "ngDropzone", "angularBetterPlaceholder", "ngWookmark","cwUtilities"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "home/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            "cwUtilities",
            function ($rootScope,utils) {
                $rootScope.activeNav = "home";
                $rootScope.pageTitle = "Home";
                $rootScope.isMobile = utils.isMobile();
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "domains",
            "authCheck",
            "cwUtilities",
            function ($scope, domains, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                $scope.Math = window.Math; // Inject Math
                $scope.domains = domains;
                $scope.ages = [3, 4, 5, 6, 7];
                $scope.selectedDomain = null;

                $scope.cards = [{
                    id: 1,
                    title: "Title of a Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[6],
                    ageRange: [3, 4]
                }, {
                    id: 2,
                    title: "Title of another Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[7],
                    ageRange: [3, 4]
                }, {
                    id: 3,
                    title: "Title of this Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[1],
                    ageRange: [3, 4]
                }, {
                    id: 4,
                    title: "Title of that Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[2],
                    ageRange: [3, 7]
                }, {
                    id: 5,
                    title: "Title of some Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[3],
                    ageRange: [5, 6]
                }, {
                    id: 6,
                    title: "Title of one Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[4],
                    ageRange: [3, 7]
                }, {
                    id: 7,
                    title: "Title of some other Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[5],
                    ageRange: [3, 7]
                }, {
                    id: 8,
                    title: "Title of one other Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: domains[0],
                    ageRange: [3, 7]
                }, {
                    id: 9,
                    title: "Title of Card 2",
                    example: "Example of doing Card 2",
                    description: "Description of Card 2",
                    domain: domains[0],
                    ageRange: [3, 7]
                }];

                $scope.challenges = [{
                    award: "Newest",
                    title: "Paper Bag Puppet",
                    image: "img/home/placeholder-1.jpg",
                    description: "Make a funny character using a paper lunch bag.",
                    domain: "executive",
                    completions: new Array(4)
                }, {
                    award: "Funniest",
                    title: "Feeding Fluffy",
                    image: "img/home/placeholder-3.jpg",
                    description: "Show one way you take care of your pet.",
                    domain: "creative",
                    completions: new Array(6)
                }, {
                    award: "Popular",
                    title: "Monster Cookies",
                    image: "img/home/placeholder-2.jpg",
                    description: "Make one big cookie with a crazy monster face.",
                    domain: "health",
                    completions: new Array(23)
                }];

                $scope.keyDomain = 'Creative Expression';
                $scope.selectKeyDomain = function(domain){
                    $scope.keyDomain = domain;
                };

            }
        ])

        .animation(".slide", function () { // "About Curious World" slide-down
            var hideClassName = "ng-hide";

            return {
                beforeAddClass: function (element, className, done) {
                    if (className === hideClassName) {
                        $(element).slideUp(done);
                    }
                },
                removeClass: function (element, className, done) {
                    if (className === hideClassName) {
                        $(element).hide().slideDown(done);
                    }
                }
            };
        })
        .animation(".item", function () { // Card caruosel
            var lastClass = "is-last",
                activeClass = "is-active",
                forwardClass = "forward",
                speed = $.fx.speeds.slow,
                container;

            return {
                beforeRemoveClass: function (element, className, done) {
                    container = $(".items"); // Reset every time since page reloads break it

                    if (className === activeClass) {
                        container.css({ height: element.outerHeight() });
                    }

                    return done();
                },
                addClass: function (element, className, done) {
                    container = $(".items");  // Reset every time since page reloads break it

                    var isForward = container.hasClass(forwardClass);

                    if (className === lastClass) {
                        element
                            .stop()
                            .css({ left: "0%" })
                            .animate({ left: isForward ? "-150%" : "150%" }, { duration: speed, queue: false });
                    } else if (className === activeClass) {
                        // Safeguards against angular applying classes in weird orders
                        if ($(".item.is-active").length > 1) {
                            container.stop().css({ height: container.height() - element.outerHeight() });
                        } else if (!container.height()) {
                            container.css({ height: $(".item.is-last").outerHeight() });
                        }

                        // Initialize fading and position
                        element.stop().css({ left: !isForward ? "-150%" : "150%", opacity: 0 });

                        $.when(
                            container.animate({ height: element.outerHeight() }, { duration: speed, queue: false }),
                            element.animate({ left: "0%", opacity: 1 }, { duration: speed, queue: false })
                        ).done(function () {
                            container.css({ height: "" });
                        });
                    }

                    return done();
                },
                removeClass: function (element, className, done) {
                    // Handle fading
                    if (className === activeClass) {
                        element.css({ opacity: 1 }).animate({ opacity: 0 });
                    }

                    return done();
                }
            };
        })
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
