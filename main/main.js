(function (ng, $) {
    "use strict";

    // Prepare Foundation to handle extra dropdown and modal logic
    $(function () {

      /* we need this only on touch devices */
      if (Modernizr.touch) {
        /* cache dom references */
        var $body = jQuery('body');

        /* bind events */
        $(document)
        .on('focus', 'input', function(e) {
          $body.addClass('fixfixed');
        })
        .on('blur', 'input', function(e) {
          $body.removeClass('fixfixed');
        });
      }

        var wrapper,
            activeClassName = "reveal-is-open",
            revealEvents = ["open", "close"];

        $(document)
            .foundation({
                offcanvas: {
                    close_on_click: false
                }
            })
            .on(revealEvents.join(" "), "[data-reveal]", function (e) { // Handle blurring
                wrapper.toggleClass(activeClassName, e && e.type === revealEvents[0]);
            })
            .on("click", "[data-reveal-id='nav-modal']", function () {
                var $this = $(".mobile-button"),
                    modal = $("#nav-modal"),
                    events = modal.data("events");

                if (!(events && events.hasOwnProperty("close"))) {
                    modal.on(revealEvents.join(" ") + " closed", function (e) {
                        $this.toggleClass("close-reveal-modal", e && e.type === revealEvents[0]);
                    });
                }
            })
            .on("click", ".selector .f-dropdown.open > *", function () { // Handle re-closing dropdowns
                var $this = $(this).parent(),
                    events = $this.data("events"),
                    id = $this.attr("id");

                // Handle bug where closing a dropdown inside of a modal breaks the modal
                if (!(events && events.hasOwnProperty("closed"))) {
                    $this.on("closed", function () {
                        return false;
                    });
                }

                // If open, click the controlling element
                if (id) {
                    $("[data-dropdown='" + id + "']").trigger("click");
                }
            })
            .on("click", ".selector-modal > ul a", function () { // Handle closing modals
                $(this).parents("[data-reveal]").foundation("reveal", "close");
            })
            .on("click", "#mobile-back, .right-off-canvas-menu li:not(.is-locked) a", function () { // Global close button
                $(".open[data-reveal]").foundation("reveal", "close");
                $(".move-left, .move-right").removeClass("move-left move-right");
            })
            .on("click", "#nav-modal label", function () {
                $(this)
                    .toggleClass("is-open")
                    .siblings(".submenu").slideToggle();
            })
            .on("click", "#nav-modal ul li a", function(){
              $('#nav-modal').foundation("reveal", "close");
            })
            .ready(function () {
                wrapper = $("#wrapper");

                // iPhone detection until we figure out what the issue is
                if (navigator.userAgent.match(/iPhone|iPod/i)) {
                    $(document.body).addClass("iphone");
                }
            });

    });

    var app;

    // Create an app module if one doesn't exist, yet
    try {
        app = ng.module("app");
    } catch (e) {
        app = ng.module("app", ["authenticate.js", "angularBetterPlaceholder"]);
    }

    // Default stuff for the app
    app
        .constant("domains", [ // Make domains global
            { name: "creative",  title: "Creative Expression", description: "Children learn to express themselves through music, dance, drama, writing, and drawing." },
            { name: "language",  title: "Language & Literacy", description: "Children develop reading and writing skills with activities focused on vocabulary expansion, language formulation, and pattern recognition." },
            { name: "math",      title: "Mathematics", description: "Children learn counting, patterning, graphing, measuring, and sorting."         },
            { name: "science",   title: "Science", description: "Children learn to ask questions, analyze data, solve problems, and try new solutions."             },
            { name: "family",    title: "Family & Community", description: "Children learn to appreciate differences, accept other perspectives, and develop strong relationships."  },
            { name: "executive", title: "Executive Function", description: "Children learn to regulate emotions, recall details and memories, follow directions, and work with others."  },
            { name: "social",    title: "Social & Emotional", description: "Increase children’s sense of self-awareness and their ability to share and develop relationships with others."  },
            { name: "health",    title: "Health & Well\u2011Being", description: "Children learn and practice good nutrition, physical exercise, and fine motor development." }
        ])
        // .run([
        //     "$rootScope",
        //     "$interval",
        //     function ($rootScope, $interval) {
        //         // Reflow Foundation when view is loaded
        //         $rootScope.$on("$viewContentLoaded", function () {
        //             $(document).foundation();
        //
        //             // Periodically reflow Foundation until a real solution is in place
        //             $interval(function () {
        //                 $(document).foundation();
        //             }, 1000);
        //         });
        //
        //         // Add global class for usage in maintaining the sticky footer illusion
        //         $rootScope.contentClass = "";
        //     }
        // ]);
        .run(function ($rootScope) {
            $rootScope.$on("$viewContentLoaded", function () {
              $(document).foundation();
            });

            $rootScope.$on('$routeChangeSuccess', function () {
                $(document).foundation('reflow');
            });
        });


}(window.angular, window.jQuery));
