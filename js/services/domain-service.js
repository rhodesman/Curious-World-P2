(function (ng) {
    "use strict";

    ng.module("app")
        .factory("DomainService", [
            "mockAPI",
            function (mockAPI) {
                return mockAPI({
                    name: "Domains",
                    primary: ["id", "name"],
                    defaultItem: { isFree: true },
                    item: {
                        id: null,
                        name: null,
                        title: null,
                        description: null,
                        isFree: false
                    }
                }, [{
                    id: 1,
                    name: "creative",
                    title:  "Creative Expression",
                    description: "Creative Expression: Children learn to express themselves through music, dance, drama, writing, and drawing.",
                    isFree: true
                }, {
                    id: 2,
                    name: "language",
                    title:  "Language & Literacy",
                    description:"Language & Literacy: Children develop reading and writing skills with activities focused on vocabulary expansion, language formulation, and pattern recognition."
                }, {
                    id: 3,
                    name: "math",
                    title:  "Mathematics",
                    description:"Mathematics: Children learn counting, patterning, graphing, measuring, and sorting."
                }, {
                    id: 4,
                    name: "science",
                    title:  "Science",
                    description:"Science: Children learn to ask questions, analyze data, solve problems, and try new solutions."
                }, {
                    id: 5,
                    name: "family",
                    title:  "Family & Community",
                    description:"Family & Community: Children learn to appreciate differences, accept other perspectives, and develop strong relationships."
                }, {
                    id: 6,
                    name: "executive",
                    title:  "Executive Function",
                    description:"Executive Function: Children learn to regulate emotions, recall details and memories, follow directions, and work with others."
                }, {
                    id: 7,
                    name: "social",
                    title:  "Social & Emotional",
                    description:"Social & Emotional:  Increase children’s sense of self-awareness and their ability to share and develop relationships with others."
                }, {
                    id: 8,
                    name: "health",
                    title:  "Health & Well-Being",
                    description:"Health & Well-Being: Children learn and practice good nutrition, physical exercise, and fine motor development."
                }]);
            }
        ]);
}(window.angular));
