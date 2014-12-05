(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngRoute", "ngAnimate", "ngDropzone", "angularBetterPlaceholder", "ngWookmark"])
        .config([
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "flashcards/default.html",
                        controller: "DefaultController"
                    })
                    .when("/milestones", {
                        templateUrl: "flashcards/completed-milestones.html",
                        controller: "DefaultController"
                    });
            }
        ])
        .run([
            "$rootScope",
            function ($rootScope) {
                $rootScope.activeNav = "flashcards";
                $rootScope.pageTitle = "Flashcards";
            }
        ])
        .factory('Milestones', function(domains){

          var milestones = [{
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[0],
            image: '',
            isComplete: false,
            brief: 'Name of Flashcard',
            cardNo: 2,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[1],
            image: 'http://placehold.it/200x130',
            isComplete: true,
            brief: 'Name of Flashcard',
            cardNo: 22,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[2],
            image: '',
            isComplete: false,
            brief: 'Name of Flashcard',
            cardNo: 4,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[3],
            image: 'http://placehold.it/200x130',
            isComplete: true,
            brief: 'Name of Flashcard',
            cardNo: 7,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[4],
            image: '',
            isComplete: false,
            brief: 'Name of Flashcard',
            cardNo: 33,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[5],
            image: '',
            isComplete: false,
            brief: 'Name of Flashcard',
            cardNo: 42,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[6],
            image: '',
            isComplete: false,
            brief: 'Name of Flashcard',
            cardNo: 65,
            timestamp: '10/2/14'
          }, {
            title: "Title of a Card",
            skill: "Specific card skill copy",
            description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            domain: domains[7],
            image: 'http://placehold.it/200x130',
            isComplete: true,
            brief: 'Name of Flashcard',
            cardNo: 53,
            timestamp: '10/2/14'
          }];

            return {
            get: function(offset, limit) {
              return milestones.slice(offset, offset+limit);
            },
            total: function() {
              return milestones.length;
            }
          };
        })
        .controller("DefaultController", [
            "$scope",
            "domains",
            "authCheck",
            "Milestones",
            "$timeout",
            function ($scope, domains, AuthCheck, Milestones, $timeout) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                //load next set of flashcards modal
                $scope.completedFlashcards = function(){
                  $('#next-flashcards').foundation('reveal', 'open');
                  
                  //wait 10 seconds and then close
                  $timeout(function(){
                    $('#next-flashcards').foundation('reveal', 'close');
                  }, 10000);
                }

                //load default modal if no data
                $timeout(function() {
                    if(!$scope.pagedItems){
                      $('#default-flashcard').foundation('reveal', 'open');
                    }
                }, 0);


                //get milestone results and paginate
                $scope.itemsPerPage = 5;
                $scope.currentPage = 0;
                $scope.total = Milestones.total();
                $scope.pagedItems = Milestones.get($scope.currentPage*$scope.itemsPerPage, $scope.itemsPerPage);

                $scope.loadMore = function() {
                  $scope.currentPage++;
                  var newItems = Milestones.get($scope.currentPage*$scope.itemsPerPage, $scope.itemsPerPage);
                  $scope.pagedItems = $scope.pagedItems.concat(newItems);
                };

                $scope.nextPageDisabledClass = function() {
                  return $scope.currentPage === $scope.pageCount()-1 ? "disabled" : "";
                };

                $scope.pageCount = function() {
                  return Math.ceil($scope.total/$scope.itemsPerPage);
                };

                $scope.Math = window.Math; // Inject Math
                $scope.domains = domains;
                $scope.ages = [3, 4, 5, 6, 7];
                $scope.selectedDomain = null;

                $scope.cards = [{
                    id: 1,
                    title: "Title of a Card",
                    skill: "Specific card skill copy",
                    description: "Description Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    domain: domains[6],
                    ageRange: [3, 4]
                }, {
                    id: 2,
                    title: "Title of another Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[7],
                    ageRange: [3, 4]
                }, {
                    id: 3,
                    title: "Title of this Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[1],
                    ageRange: [3, 4]
                }, {
                    id: 4,
                    title: "Title of that Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[2],
                    ageRange: [3, 7]
                }, {
                    id: 5,
                    title: "Title of some Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[3],
                    ageRange: [5, 6]
                }, {
                    id: 6,
                    title: "Title of one Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[4],
                    ageRange: [3, 7]
                }, {
                    id: 7,
                    title: "Title of some other Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[5],
                    ageRange: [3, 7]
                }, {
                    id: 8,
                    title: "Title of one other Card",
                    skill: "Specific card skill copy",
                    description: "Description of Card",
                    domain: domains[0],
                    ageRange: [3, 7]
                }, {
                    id: 9,
                    title: "Title of Card 2",
                    skill: "Specific card skill copy",
                    description: "Description of Card 2",
                    domain: domains[0],
                    ageRange: [3, 7]
                }];

                $scope.keyDomain = 'Creative Expression';
                $scope.selectKeyDomain = function(domain){
                    $scope.keyDomain = domain;
                };

            }
        ])
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
                        element.stop().css({ left: !isForward ? "-150%" : "150%", opacity: 1 });

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
                       element.css({ opacity: 1 });
                    }

                    return done();
                }
            };
        });

}(window.angular, window.jQuery));
