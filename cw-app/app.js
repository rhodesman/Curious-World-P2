(function (ng, $) {
    "use strict";

    ng.module("app", ["authenticate.js", "ngRoute", "ngAnimate", "angularBetterPlaceholder", "dotdotdot-angular"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "cw-app/default.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "cw-app";
                $rootScope.pageTitle = "App";
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "domains",
            function ($scope, domains) {
                $scope.domains = domains;

                $scope.categories = [
                    { title: "Most Popular" },
                    { title: "Newest" },
                    { title: "Curious George" }
                ];

                $scope.sorting = [
                    { title: "Lowest Price", value: "-price" },
                    { title: "Highest Price", value: "+price" }
                ];

                $scope.appPacks = [{
                    title: "Dino Discovery",
                    price: 1.99,
                    image: "img/cw-app/packs/dino-pack.png"
                }, {
                    title: "Favorite Things",
                    price: 1.99,
                    image: "img/cw-app/packs/favorite-pack.png"
                }, {
                    title: "Eyes",
                    price: 1.99,
                    image: "img/cw-app/packs/eye-pack.png"
                }, {
                    title: "Animal Eyes",
                    price: 1.99,
                    image: "img/cw-app/packs/animal-pack.png"
                }];

                $scope.apps = [{
                    title: "Curious George's Town",
                    image: "img/cw-app/other-apps/icon-7.png"
                }, {
                    title: "Curious George's Town",
                    image: "img/cw-app/other-apps/icon-6.png"
                }, {
                    title: "HMH Fuse: Math",
                    image: "img/cw-app/other-apps/icon-5.png"
                }, {
                    title: "Nutrition and Healthy Eating ! Educational games to teach kids in Preschool and Kindergarten about balanced diet by i Learn With ",
                    image: "img/cw-app/other-apps/icon-4.png"
                }, {
                    title: "HMH Readers",
                    image: "img/cw-app/other-apps/icon-3.png"
                }, {
                    title: "Counting and Addition! Math educational games for kids in Preschool and Kindergarten by i Learn With ",
                    image: "img/cw-app/other-apps/icon-2.png"
                }, {
                    title: "Draw with Curious George",
                    image: "img/cw-app/other-apps/icon-1.png"
                }, {
                    title: "Sing. Math, Bar Models",
                    image: "img/cw-app/other-apps/icon-8.png"
                }, {
                    title: "Counting and Addition! Math educational games for kids in Preschool and Kindergarten by i Learn With ",
                    image: "img/cw-app/other-apps/icon-2.png"
                }];
            }
        ])
        .filter("fixAppTitle", function () {
            var regex = /((\s+)?!).+(\sby)/,
                replacement = "! by";

            return function(value) {
                return value.replace(regex, replacement);
            };
        })
        .animation(".slide", function () { // "Is your child curious" slide-down
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
        });
}(window.angular, window.jQuery));
