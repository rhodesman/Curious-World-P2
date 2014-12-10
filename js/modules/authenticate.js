//based on https://github.com/youknowriad/authenticate.js/blob/master/build/authenticate.js

/*
 To use this library you should have a server application that handles authentication with sessions
 and it should have a login api that uses a username and password parameters,
 a logout url and an api endpoint to get the current loggedin user with its credentials. (Configured in app.js)
 */

// Router
angular.module('authenticate.js', ['ngRoute']);

// Handling Authorizations
angular.module('authenticate.js').run(['$rootScope', '$location', 'AuthenticateJS', 'Referer',
  function ($rootScope, $location, AuthenticateJS, Referer) {
  $rootScope.$on("$routeChangeStart", function (event, next) {
    if (next !== null && !AuthenticateJS.authorize(next.security)) {
      if (AuthenticateJS.isLoggedIn()) {
        $location.path(AuthenticateJS.unauthorizedPage);
      } else {
        Referer.set($location.url());
        $location.path(AuthenticateJS.loginPage);
      }
    }
  });
}]);

angular.module('authenticate.js').directive('authenticateLoginForm', function () {
  return {
    scope: true,
    controller: ['$scope', '$location', 'AuthenticateJS', 'Referer', '$timeout',
      function ($scope, $location, AuthenticateJS, Referer, $timeout) {
      $scope.error    = false;
      $scope.ready  = false;

      var redirect = function () {
        if (Referer.has()) {
          var url = Referer.get();
          Referer.reset();
          $location.path(url);
        } else {
          $location.path(AuthenticateJS.targetPage);
        }
      };

      // Check Login
      AuthenticateJS.check().then(function() {
        redirect();
      }, function() {
        $scope.ready = true;
      });

      // Login
      $scope.submit = function() {

            $scope.errorStatus = null;

            if (!$scope.loginForm.$valid || $scope.errorStatus != null) {
                $scope.error = true;
            } else {
              //simulate loading start
              $('.loader-bg').css({
                display: 'block',
                opacity: 1
              });
              $('.loader-bg > div').addClass('loader');
              $timeout(function(){

                  //simulate loading end
                  $('.loader-bg').css({
                    display: 'none',
                    opacity: 0
                  });
                  $('.loader-bg > div').removeClass('loader');
                  //authentication continue
                  AuthenticateJS.login($scope.username, $scope.password).then(function () {
                      //$scope.password = '';
                      redirect();
                  }, function (error) {
                      $scope.errorStatus = error;
                      $scope.loading = false;
                      $scope.error = true;
                  });

              },3000);
            }
      };
    }],

    templateUrl: function(element, attr) {
      return attr.templateUrl ? attr.templateUrl : 'account/sign-in.html';
    }
  };
});
angular.module('authenticate.js').factory('Referer', function() {

  return {
    url: false,

    has: function() {
      return this.url !== false;
    },

    reset: function () {
      this.url = false;
    },

    set: function (url) {
      this.url = url;
    },

    get: function () {
      return this.url;
    }
  };

});
angular.module('authenticate.js').provider('AuthenticateJS', function () {

  var config = {
    host: '/',
    loginUrl: 'login',
    logoutUrl: 'logout',
    loggedinUrl: 'loggedin',

    unauthorizedPage: '/unauthorized',
    targetPage: '/',
    loginPage: '/login',
    signupUrl: 'signup',
    deleteAccountUrl: 'deleteAccount',
    updateAccountUrl: 'updateAccount'
  };

  this.setConfig = function (configuration) {
    config = configuration;
  };

  this.$get = ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {

    var user = null,
        lastUser = null;

    return {

      targetPage: config.targetPage,
      loginPage: config.loginPage,
      unauthorizedPage: config.unauthorizedPage,

      getUser: function () {
        return user;
      },

      getLastUser: function () {
        return lastUser;
      },

      isLoggedIn: function () {
        return user !== null;
      },

      authorize: function (role) {
        return !role || (
          user !== null &&
            (role === true || _.contains(user.roles, role))
          );
      },//fill in details according to eventual api
      createAccount: function (email,password,firstName,lastName,displayName,sharePublic,sendNews) {
            var defer = $q.defer();
            $http({
                url: config.host + config.signupUrl,
                method: 'POST',
                data: {
                    username: email,
                    password: password,
                    firstName: firstName,
                    lastName:lastName,
                    displayName:displayName,
                    sharePublic:sharePublic,
                    sendNews:sendNews
                }
            }).success(function (data) {
                if (angular.isUndefined(data.error) || data.error == null){
                    user = data;
                    lastUser = data;
                    user.created = true;
                    defer.resolve(user);
                    $rootScope.$broadcast('AuthenticateJS.login', user);
                }else{
                    defer.reject(data.error);
                }
            }).error(function () {
                defer.reject();
            });

            return defer.promise;
      },
        updateAccount: function (email,password,firstName,lastName,displayName,sharePublic,sendNews) {
            var defer = $q.defer();
            $http({
                url: config.host + config.updateAccountUrl,
                method: 'POST',
                data: {
                    username: email,
                    password: password,
                    firstName: firstName,
                    lastName:lastName,
                    displayName:displayName,
                    sharePublic:sharePublic,
                    sendNews:sendNews
                }
            }).success(function (data) {
                if (angular.isUndefined(data.error) || data.error == null){
                    user = data;
                    lastUser = data;
                    defer.resolve(user);
                    $rootScope.$broadcast('AuthenticateJS.update', user);
                }else{
                    defer.reject(data.error);
                }
            }).error(function () {
                defer.reject();
            });

            return defer.promise;
        },
        deleteAccount: function (reason, otherReason) {
            var defer = $q.defer();
            $http({
                url: config.host + config.deleteAccountUrl,
                method: 'POST',
                data: {
                    reason: reason,
                    otherReason: otherReason //optional only if other option is selected
                }
            }).success(function (data) {
                if (angular.isUndefined(data.error) || data.error == null) {
                    defer.resolve();
                } else {
                    defer.reject(data.error);
                }
            }).error(function () {
                defer.reject();
            });

            return defer.promise;
        },
      //This login method needs to reflect the behavior of the api including response states/error codes/etc
      //It expects either a user object OR an object with an "error" property, which should be the human readable error for display
      login: function (username, password) {
        var defer = $q.defer();
        $http({
          url: config.host + config.loginUrl,
          method: 'POST',
          data: {
            username: username,
            password: password
          }
        }).success(function (data) {
            if (angular.isUndefined(data.error) || data.error == null){
                user = data;
                lastUser = data;
                defer.resolve(user);
                $rootScope.$broadcast('AuthenticateJS.login', user);
            }else{
                defer.reject(data.error);
            }
          }).error(function () {
            defer.reject();
          });

        return defer.promise;
      },

      logout: function () {
        var defer = $q.defer();
        $http.get(config.host + config.logoutUrl).success(function () {
          user = null;
          defer.resolve();
          $rootScope.$broadcast('AuthenticateJS.logout');
        }).error(function () {
            user = null;
            defer.reject();
          });

        return defer.promise;
      },

      check: function () {
        var defer = $q.defer();
        $http({
          url: config.host + config.loggedinUrl,
          method: 'GET'
        }).success(function (data) {
            var previous = user;
            user = data;
            lastUser = data;
            defer.resolve(user);
            if (!angular.equals(previous, user)) {
              $rootScope.$broadcast('AuthenticateJS.login', user);
            }
          }).error(function () {
            if (user !== null) {
              $rootScope.$broadcast('AuthenticateJS.logout');
            }
            user = null;
            defer.reject();
          });

        return defer.promise;
      }
    };
  }];
});
