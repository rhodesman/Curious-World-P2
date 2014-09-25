(function (ng) {
    "use strict";

    ng.module("app")
        .factory("CuriosityKitService", [
            "$q",
            "mockAPI",
            "DomainService",
            function ($q, mockAPI, DomainService) {
                var items = [],
                    testData = [{
                        id: "KgH1k5d9xL",
                        domains: [1, 2, 3],
                        price: 10
                    }, {
                        id: "UJQH3QUe09",
                        domains: [2, 3, 4],
                        price: 15
                    }, {
                        id: "7Di9F6MwQH",
                        domains: [1, 4],
                        price: 11
                    }, {
                        id: "GVfI38716W",
                        domains: [5, 6, 7, 8],
                        price: 20
                    }, {
                        id: "7EcFJb0g7S",
                        domains: [1],
                        price: 5
                    }];

                // Build test data's items
                [ "ff0000", "008000", "ffff00", "800080", "ffa500", "ffd700" ].forEach(function (hex, i) {
                    items.push({
                        image: "http://placehold.it/218x218/" + hex,
                        title: "Lorem Ipsum",
                        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    });
                });

                // Standardize test data
                testData.forEach(function (item, i) {
                    item.title = "Curiosity Kit #" + (i + 1);
                    item.items = items;
                    item.description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
                });

                return mockAPI({
                    name: "CuriosityKits",
                    primary: "id",
                    item: {
                        id: null,
                        title: null,
                        description: null,
                        domains: null,
                        price: 0,
                        items: null
                    },
                    relations: {
                        domains: {
                            callback: function (domains) {
                                var promises = [];

                                domains.forEach(function (id, i) {
                                    promises.push(DomainService.get({ id: id }).then(function (domain) {
                                        domains[i] = domain;
                                    }));
                                });

                                return $q.all(promises).then(function () {
                                    return domains;
                                });
                            }
                        }
                    }
                }, testData);
            }
        ]);
}(window.angular));
