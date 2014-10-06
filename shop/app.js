(function (ng) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "ngSkrollr", "angularBetterPlaceholder", "slick"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "curiosity-kits/default.html",
                        controller: "DefaultController"
                    })
                    .when("/:id", {
                        templateUrl: "curiosity-kits/single.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "curiosity-kits";
                $rootScope.pageTitle = "Curiosity Kits";
            }
        ])
        .controller("DefaultController", [
            "$scope",
            "$routeParams",
            "$location",
            "$anchorScroll",
            "domains",
            "authCheck",
            function ($scope, $routeParams, $location,$anchorScroll, domains, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                var items = [{
                    title: "Gus, the Dinosaur Bus",
                    author: "Julia Liu, Bei Lynn",
                    image: "http://www.houghtonmifflinbooks.com/assets/product/9780547905730_lres.jpg",
                    description: "All the schoolchildren love Gus, the dinosaur bus! But when Gus' large feet cause traffic jams and other dino-sized problems, the principal must decide whether Gus should continue taking the children to school every morning."
                }, {
                    title: "Patrick's Dinosaurs",
                    author: "Carol Carrick, Donald Carrick",
                    image: "http://www.houghtonmifflinbooks.com/assets/product/0899194028_lres.jpg",
                    description: "One Saturday while visiting the zoo, Hank tells his brother Patrick all about dinosaurs, and Patrick scares himself by imagining what it would be like if the great creatures were alive today."
                }, {
                    title: "Curious George's Dinosaur Discovery",
                    author: "Anna Hines, H. A. Rey",
                    image: "http://www.houghtonmifflinbooks.com/assets/product/0618663770_lres.jpg",
                    description: "Curious George loves dinosaurs, so he's excited to visit a dig to look for real dinosaur bones. Will the curious little monkey help make a big discovery?"
                }, {
                    title: "If the Dinosaurs Came Back",
                    author: "Bernard Most",
                    image: "http://www.houghtonmifflinbooks.com/assets/product/9780152380212_lres.jpg",
                    description: "In this delightful book, a small boy imagines a world where dinosaurs perform public services. Bold lines accentuate imaginative, humorous ideas. A natural for student response: students formulate their own outcomes about what would happen if the dinosaurs returned. An overwhelming favorite in the early grades."
                }];

                // Domains
                $scope.domains = domains;

                // Categories
                $scope.categories = [
                    { title: "Most Popular" },
                    { title: "Newest" },
                    { title: "Curious George" }
                ];

                // Kits
                $scope.kits = [{
                    title: "Dinosaurs",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.",
                    domains: $scope.domains, // All domains
                    items: items,
                    thumbnail: "img/store/Store-Kit-01.png",
                    price: 19.99
                }, {
                    title: "Things That Go!",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.",
                    domains: [
                        $scope.domains[3],
                        $scope.domains[4]
                    ],
                    items: items,
                    thumbnail: "img/store/Store-Kit-03.png",
                    price: 19.99
                }, {
                    title: "Friends!",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.",
                    domains: [
                        $scope.domains[3],
                        $scope.domains[4],
                        $scope.domains[5]
                    ],
                    items: items,
                    thumbnail: "img/store/Store-Kit-04.png",
                    price: 19.99
                }, {
                    title: "My Favorite Characters",
                    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et.",
                    domains: [
                        $scope.domains[0],
                        $scope.domains[1],
                        $scope.domains[2],
                        $scope.domains[6]
                    ],
                    items: items,
                    thumbnail: "img/store/Store-Kit-02.png",
                    price: 19.99
                }];

                // Featured & carousel kits
                $scope.featuredKits = $scope.kits.slice(0, 2);
                $scope.carouselKits = $scope.kits.slice(0, 3);

                // Kit from URL
                if ($routeParams.hasOwnProperty("id")) {
                    $scope.kit = $scope.kits[$routeParams.id];
                }


                $scope.gotoBottom = function() {
                    $scope.$emit('GotoBottom');
                };
                // Fix scroll position
                $anchorScroll();
            }
        ]);
}(window.angular));
