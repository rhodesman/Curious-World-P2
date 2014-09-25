(function (ng, $) {
    "use strict";

    ng.module("app")
        .directive("doctorExplains", [
            function () {
                return {
                    restrict: "AE",
                    transclude: true,
                    templateUrl: 'partials/directives/doctor-explains.html', 
                    link: function(){
                      $('.more-info').on('click', function(){
                        $('.explanation-info').slideToggle('fast', function(){
                            //animation completes
                        });
                      });
                    }
                };
            }
        ]);


}(window.angular, window.jQuery));
