(function (ng) {
    "use strict";

    ng.module("app")
        .factory("CardService", [
            "mockAPI",
            "DomainService",
            function (mockAPI, DomainService) {
                return mockAPI({
                    name: "Cards",
                    primary: "id",
                    item: {
                        id: null,
                        title: null,
                        example: null,
                        description: null,
                        domain: null,
                        ageRange: null
                    },
                    relations: {
                        domain: {
                            relation: "id",
                            callback: function (id) {
                                return DomainService.get({ id: id });
                            }
                        }
                    }
                }, [{
                    id: 1,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 7,
                    ageRange: [3, 4]
                }, {
                    id: 2,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 8,
                    ageRange: [3, 4]
                }, {
                    id: 3,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 2,
                    ageRange: [3, 4]
                }, {
                    id: 4,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 3,
                    ageRange: [3, 7]
                }, {
                    id: 5,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 4,
                    ageRange: [5, 6]
                }, {
                    id: 6,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 5,
                    ageRange: [3, 7]
                }, {
                    id: 7,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 6,
                    ageRange: [3, 7]
                }, {
                    id: 8,
                    title: "Title of Card",
                    example: "Example of doing Card",
                    description: "Description of Card",
                    domain: 1,
                    ageRange: [3, 7]
                }, {
                    id: 9,
                    title: "Title of Card 2",
                    example: "Example of doing Card 2",
                    description: "Description of Card 2",
                    domain: 1,
                    ageRange: [3, 7]
                }]);
            }
        ]);
}(window.angular));
