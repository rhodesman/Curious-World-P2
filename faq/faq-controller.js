(function (ng, $) {
    "use strict";

    ng.module("app", ["authCheck", "ngAnimate"])
        .controller("FaqController", [
            "$scope",
            "authCheck",
            function ($scope, AuthCheck) {
                ng.extend($scope, new AuthCheck($scope)); // Inject authentication checking

                // Questions
                $scope.general = [{
                    title: "What is CuriousWorld.com?",
                    answer: "CuriousWorld.com informs parents about developmental milestones for kids, ages 3-7. In total, there are approximately 200 milestones that correspond to school readiness. CuriousWorld.com lets parents and kids practice these skills and track a child's growth across 8 key learning areas."
                }];

                //scroll to ID 
                $scope.scrollTo = function(element) {
                  //requires an element to be an id (or add '#' or '.' to html)
                  var idElement = '#' + element;
                  var offset = 100;
                  $( 'html, body').animate({
                    scrollTop: $(idElement).offset().top - offset
                  }, 250);
                };

                //Cards
                $scope.cards = [{
                    title: "What are Cards?",
                    answer: "These are micro-activities for anytime, anywhere learning. Try out our Cards for free by practicing skills in the Creative Expression domain.  Purchase the entire set and you will get full coverage of all the skills your child needs for balanced growth and learning."
                }, {
                    title: "How do I purchase the Cards?",
                    answer: "Visit www.curiousworld.hmhco.com and click on the “Unlock Cards” button."
                }, {
                    title: "Can I purchase Cards outside the United States?",
                    answer: "You can only purchase Cards with a credit card that has a billing address in the United States."
                }];

                //Community
                $scope.community = [{
                    title: "What is the Community?",
                    answer: "A place for parents to connect (and smile!) over shared experiences. Complete our Challenges and share photos and videos of “Me too!” moments. "
                }, {
                    title: "Will anyone be able to view my submissions?",
                    answer: "[text to come]"
                }, {
                    title: "What if I see content I think is inappropriate?",
                    answer: "[text to come]"
                }];

                //Shop
                $scope.shop = [{
                    title: "What are gift boxes?",
                    answer: "Gift boxes are curated collections of new and timeless classics.  The book sets are aligned to eight key developmental areas and help target skills across a broad range of academic and social topics."
                }, {
                    title: "Can I purchase Gift Boxes outside the United States?",
                    answer: "You can only purchase Gift Boxes with a credit card that has a billing address in the United States."
                }];

                //Apps
                $scope.apps = [{
                    title: "What are Apps?",
                    answer: "The Curious World and HMH Apps encourage children to investigate, imagine, observe, and discover new things as they play. "
                }, {
                    title: "How can I purchase an App?",
                    answer: "[text to come]"
                }];

                //Manage
                $scope.manage = [{
                    title: "How do I change the email, password, or display name associated with the account?",
                    answer: "[text to come]"
                }];

                //Technical
                $scope.technical = [{
                    title: "What browsers can I use to access Curious World.com?",
                    answer: "[text to come]"

                }, {
                    title: "Can I use CuriousWorld.com on a tablet",
                    answer: "[text to come]"
                }, {
                    title: "Can I use CuriousWorld.com on my mobile phone?",
                    answer: "[text to come]"
                }];
            }
        ])
        .animation('.slide', function() {
          var NgHideClassName = 'ng-hide';
          return {
            beforeAddClass: function(element, className, done) {
              if(className === NgHideClassName) {
                $(element)
                  .slideUp(50)
                  .animate({opacity:0}, 50);
                $(element).prev().removeClass('active');
              }
            },
            removeClass: function(element, className, done) {
              if(className === NgHideClassName) {
                $(element)
                  .hide()
                  .slideDown(50)
                  .animate({opacity:1}, 50);
                $(element).prev().addClass('active');
              }
            }
          };
        });
}(window.angular, window.jQuery));
