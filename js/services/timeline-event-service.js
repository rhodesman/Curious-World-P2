(function (ng) {
    "use strict";

    ng.module("app")
        .factory("TimelineEventService", [
            "mockAPI",
            "CardService",
            function (mockAPI, CardService) {
                var testData = [{
                    id: "KgH1k5d9xL",
                    user: 1,
                    type: "card",
                    date: new Date(),
                    item: 1,
                    media: ""
                }, {
                    id: "UJQH3QUe09",
                    user: 1,
                    type: "card",
                    date: new Date("5/26/14 12:00:00"),
                    item: 9,
                    media: ""
                }, {
                    id: "7Di9F6MwQH",
                    user: 1,
                    type: "card",
                    date: new Date("5/21/14 12:00:00"),
                    item: 7,
                    media: ""
                }, {
                    id: "GVfI38716W",
                    user: 1,
                    type: "card",
                    date: new Date("5/16/14 12:00:00"),
                    item: 6,
                    media: ""
                }, {
                    id: "7EcFJb0g7S",
                    user: 1,
                    type: "card",
                    date: new Date("5/1/14 12:00:00"),
                    item: 5,
                    media: ""
                }];

                return mockAPI({
                    name: "TimelineEvents",
                    primary: "id",
                    item: {
                        id: null,
                        user: null,
                        type: null,
                        date: null,
                        item: null,
                        media: null
                    },
                    relations: {
                        item: {
                            relation: "id",
                            callback: function (id) {
                                if (this.type === "card") {
                                    return CardService.get({ id: id });
                                }

                                return null;
                            }
                        }
                    }
                });
            }
        ]);
}(window.angular));
