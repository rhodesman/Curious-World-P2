(function (ng) {
    "use strict";

    ng.module("app")
        .provider("mockAPI", function () {
            var provider = this;

            this.defaultRelation = "id";
            this.pingName = "lastUpdate";
            this.pingTime = 10000;
            this.defaults = {
                name: "MockData",
                primary: "id",
                item: { id: null },
                relations: null,
                data: []
            };

            this.$get = [
                "$q",
                "$timeout",
                "$interval",
                "localStorageService",
                "uuid4",
                "$log",
                function ($q, $timeout, $interval, localStorageService, uuid4, $log) {
                    return function (options, data) {
                        var self, factory, i;

                        // Store private members
                        self = {
                            name: (options && options.name) || provider.defaults.name,
                            primary: (options && options.primary) || provider.defaults.primary,
                            item: (options && options.item) || provider.defaults.item,
                            relations: (options && options.relations) || provider.defaults.relations,
                            defaultItem: (options && options.defaultItem) || null,
                            data: null,
                            dataBy: {}, // Data dictionaries by primary key(s)
                            lastPing: null // Timestamp of the last ping operation
                        };

                        // Build private methods
                        self.hasDictionary = function (attribute) { // Check if a dictionary exists
                            return self.dataBy.hasOwnProperty(attribute) && self.dataBy[attribute];
                        };

                        self.buildDictionary = function (attribute) { // Build a dictionary for an attribute
                            self.dataBy[attribute] = {};

                            self.data.forEach(function (item) {
                                self.dataBy[attribute][item[attribute]] = item;
                            });

                            return self.dataBy[attribute];
                        };

                        self.processRelations = function (item) { // Process relationships
                            var promises = [],
                                relation,
                                callback;

                            callback = function (value) {
                                item[relation] = value;
                            };

                            for (relation in self.relations) {
                                if (self.relations.hasOwnProperty(relation)) {// && !ng.isObject(item[relation])) {
                                    promises.push(self.relations[relation].callback.call(item, item[relation]).then(callback));
                                }
                            }

                            return promises;
                        };

                        self.checkProperty = function (item, attribute, value) { // Check a property's equality, keeping relational values in mind
                            var currentValue = item[attribute];

                            // Check if property is relational
                            if (self.relations.hasOwnProperty(attribute)) {
                                // Check if either value is an object
                                if (ng.isObject(item[attribute])) {
                                    currentValue = item[attribute][self.relations[attribute].relation || provider.defaultRelation];
                                }

                                if (ng.isObject(value)) {
                                    value = value[self.relations[attribute].relation || provider.defaultRelation];
                                }
                            }

                            return currentValue === value;
                        };

                        self.cleanItem = function (data) { // Remove any extra data fields and relations
                            var item = {};

                            Object.keys(self.item).forEach(function (attribute) {
                                item[attribute] = data[attribute] || self.item[attribute];
                            });

                            if (item.hasOwnProperty("date")) {
                                item.date = (new Date(item.date)).getTime();
                            }

                            return item;
                        };

                        self.getData = function () { // Update our data
                            self.lastPing = Date.now();
                            self.data = localStorageService.get(self.name) || [];

                            // Update dictionaries
                            self.primary.forEach(function (attribute) {
                                self.buildDictionary(attribute);
                            });
                        };

                        self.updateData = function () { // Update the localStorage's data
                            var rawData = [];

                            // Get data without relational objects
                            self.data.forEach(function (item) {
                                rawData.push(self.cleanItem(item));
                            });

                            localStorageService.set(self.name + "." + provider.pingName, new Date());
                            localStorageService.set(self.name, JSON.stringify(rawData) || []);
                        };

                        self.ping = function () { // Ping the localStorage to see if an update is needed
                            var lastUpdate = localStorageService.get(self.name + "." + provider.pingName);

                            // If the last update was after the last ping, update our data
                            if (lastUpdate && lastUpdate > self.lastPing) {
                                $log.log("getting data");
                                self.getData();
                            } else {
                                // Assume that the ping will be updated if the data needs to be retrieved
                                self.lastPing = Date.now();
                            }
                        };

                        self.promise = function (data) { // Promise a particular set of data
                            var deferred = $q.defer();

                            $timeout(function () {
                                var promises = [];

                                if (data) {
                                    if (self.relations) {
                                        if (Array.isArray(data)) {
                                            data.forEach(function (item) {
                                                promises.concat(self.processRelations(item));
                                            });
                                        } else {
                                            promises = self.processRelations(data);
                                        }
                                    }

                                    if (promises.length) {
                                        $q.all(promises)["finally"](function () {
                                            deferred.resolve(data);
                                        });
                                    } else {
                                        deferred.resolve(data);
                                    }
                                } else {
                                    deferred.reject(data);
                                }
                            }, 0); // Fake load time

                            return deferred.promise;
                        };

                        // Build public interface
                        factory = {
                            get: function (options) { // Get data
                                if (!options) {
                                    return this.getAll();
                                }

                                // Check primary keys
                                for (i = 0; i < self.primary.length; i++) {
                                    if (options.hasOwnProperty(self.primary[i])) {
                                        return this.getBy[self.primary[i]](options[self.primary[i]]);
                                    }
                                }

                                return this.filter(null, options);
                            },

                            getAll: function () { // Get all data
                                return self.promise(self.data);
                            },

                            getDefault: function () { // Get the default item
                                if (self.defaultItem) {
                                    return this.filter(self.defaultItem).then(function (items) {
                                        return items.length ? items[0] : self.data[0];
                                    });
                                }

                                return self.promise(self.data[0]);
                            },

                            getBy: {}, // Stores the primary key functions (eg. getBy.id)

                            filter: function (data, rules) { // Filter a data set by rules
                                var filteredData = [],
                                    checkItem,
                                    rule;

                                data = data || self.data;

                                checkItem = function (item) { // Check if item matches the rule
                                    if (item.hasOwnProperty(rule) && self.checkProperty(item, rule, rules[rule])) {
                                        filteredData.push(item);
                                    }
                                };

                                // Check all rules for equality
                                for (rule in rules) {
                                    if (rules.hasOwnProperty(rule) && data.length) {
                                        // Check each item in the data set against the rule
                                        data.forEach(checkItem);

                                        // Apply the filtered data
                                        data = filteredData;
                                        filteredData = [];
                                    }
                                }

                                return self.promise(data);
                            },

                            add: function (data) { // Add an item
                                var primaryKey = self.primary[0],
                                    item = self.cleanItem(data);

                                // Make sure the dictionary for the primary key is ready
                                if (!self.hasDictionary(primaryKey)) {
                                    self.buildDictionary(primaryKey);
                                }

                                // Validate ID
                                if (!item[primaryKey]) {
                                    item[primaryKey] = uuid4.generate();
                                } else if (self.dataBy[primaryKey].hasOwnProperty(item[primaryKey])) {
                                    throw new Error("Primary key '" + item[primaryKey] + "' is already in use");
                                }

                                // Update data
                                self.data.push(item);
                                self.updateData();

                                // Add item to dictionaries
                                self.primary.forEach(function (attribute) {
                                    if (self.hasDictionary(attribute)) {
                                        self.dataBy[attribute][item[attribute]] = item;
                                    }
                                });

                                return self.promise(item);
                            },

                            update: function (data) { // Update an item's data
                                var primaryKey = self.primary[0],
                                    item = self.cleanItem(data),
                                    existingItem,
                                    i;

                                // Make sure a primary key is provided
                                if (!item[primaryKey]) {
                                    throw new Error("Data being updated is missing its primary key");
                                }

                                // Make sure the dictionary for the primary key is ready
                                if (!self.hasDictionary(primaryKey)) {
                                    self.buildDictionary(primaryKey);
                                }

                                // Get the existing item
                                existingItem = self.dataBy[primaryKey][item[primaryKey]];

                                for (i in item) {
                                    if (item.hasOwnProperty(i)) {
                                        existingItem[i] = item[i];
                                    }
                                }

                                // Update data
                                self.updateData();
                                return self.promise(existingItem);
                            },

                            remove: function (rules) {
                                // Make sure the valid rules object isn't empty
                                if (!ng.isObject(rules) || !Object.keys(rules).length) {
                                    throw new Error("MockAPI 'remove' method expects a non-empty object");
                                }

                                // Get the item to remove
                                return this.filter(rules).then(function (item) {
                                    var index = self.data.indexOf(item);

                                    if (index >= 0) {
                                        // Update data
                                        self.data.splice(index, 1);
                                        self.updateData();

                                        // Update dictionaries
                                        self.primary.forEach(function (attribute) {
                                            if (self.hasDictionary(attribute)) {
                                                delete self.dataBy[attribute][item[attribute]];
                                            }
                                        });

                                        return true;
                                    }

                                    return false;
                                });
                            }
                        };

                        // Force primary keys to be an array
                        if (!Array.isArray(self.primary)) {
                            self.primary = [self.primary];
                        }

                        // Initialize the data
                        self.data = data || (options && options.data) || provider.defaults.data;

                        if (!Array.isArray(self.data)) {
                            throw new Error("Bad data for MockAPI '" + self.name + "'. Expecting Array, got " + (typeof data));
                        } else if (self.data.length) {
                            self.updateData();
                        } else {
                            self.getData();
                        }

                        // Create "getBy" functions
                        self.primary.forEach(function (attribute) {
                            factory.getBy[attribute] = function (value) {
                                if (!self.hasDictionary(attribute)) {
                                    self.buildDictionary(attribute);
                                }

                                return self.promise(self.dataBy[attribute][value] || null);
                            };
                        });

                        // Periodically ping to see if data needs to be retrieved
                        $interval(self.ping, provider.pingTime);

                        return factory;
                    };
                }
            ];
        });
}(window.angular));
