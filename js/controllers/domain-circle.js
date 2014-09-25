(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("domainCircle", [
            function () {
                return {
                    restrict: "AE",
                    transclude: true,
                    controller: 'CuriosityKitsController',
                    templateUrl: 'partials/directives/curiosity-kit-circle.html', 
                    link: function(){
                        $('.curiosity-kit ul').hover(function(){
                            $(this).find('li').removeClass('closed');
                            $(this).find('li').addClass('open');
                        }, 
                        function(){
                            $(this).find('li').removeClass('open');
                            $(this).find('li').addClass('closed');
                        });
                    }
                };
            }
        ]);


}(window.angular, window.jQuery));
