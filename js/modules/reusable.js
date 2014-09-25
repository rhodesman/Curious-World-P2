(function (ng) {
	"use strict";

	ng.module("reusable", [])
        .filter("capitalize", function () {
            return function (input, scope) {
                if (input !== null) {
                    input = input.toLowerCase();
                }

                return input.substring(0, 1).toUpperCase() + input.substring(1);
            };
        })
        .service("uuid4", function () {
            var format = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

            this.generate = function () {
                return format.replace(/[xy]/g, function (c) {
                    /*jslint bitwise: true */
                    var r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
                    /*jslint bitwise: false */
                    return v.toString(16);
                });
            };
        });
}(window.angular));
