(function (ng, $) {
    "use strict";

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
        ]);



}(window.angular, window.jQuery));
