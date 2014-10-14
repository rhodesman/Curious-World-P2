/*
 To use this library you should have a server application that handles authentication with sessions
 and it should have a login api that uses a username and password parameters,
 a logout url and an api endpoint to get the current loggedin user with its credentials. (Configured in app.js)
 */

(function (ng, $) {
    "use strict";

    ng.module("app")
        .config([
            'AuthenticateJSProvider',
            function (AuthenticateJSProvider) {
                AuthenticateJSProvider.setConfig({
                    host: 'api/',                  // your base api url
                    loginUrl: 'auth/login',        // login api url
                    logoutUrl: 'auth/logout',      // logout api url
                    loggedinUrl: 'auth/loggedin',  // api to get the user profile and roles

                    unauthorizedPage: '/unauthorized',  // url (frontend) of the unauthorized page
                    targetPage: '/',           // url (frontend) of the target page on login success
                    loginPage: '/login',                 // url (frontend) of the login page
                    signupUrl: 'auth/signup',       // signup api url
                    deleteAccountUrl: 'auth/deleteAccount', //deleteaccount api url
                    updateAccountUrl: 'auth/updateProfile' //updateprofile api url
                });
            }
        ]).controller("AccountController", [
            'AuthenticateJS',
            "$scope",
            "$timeout",
            "$location",
            function (AuthenticateJS, $scope, $timeout, $location) {

                $scope.signUpFormData = {};
                $scope.userInfo = AuthenticateJS;

                //Sign up method
                $scope.signUpNext = function () {
                    if (this.createAccountForm.$valid) {
                        $scope.submitted = false;
                        $('#create-account-next-modal').foundation('reveal', 'open');
                    }
                };

                $scope.signUp = function () {
                    if ($scope.createAccountForm.$valid)
                    {
                      $scope.submitted = false;
                        //this is the method that is called after the form has validated (api url needs to be configured in app.js)
                        AuthenticateJS.createAccount(
                            $scope.signUpFormData.email,
                            $scope.password,
                            $scope.signUpFormData.firstName,
                            $scope.signUpFormData.lastName,
                            $scope.signUpFormData.displayName,
                            $scope.signUpFormData.storyVisibility, //Public or Curious World community only
                            $scope.signUpFormData.receiveNews // true or false
                        ).then(function () {
                            //if anything needs to happen besides logging in
                                $('#successModal').foundation('reveal', 'open');
                            }, function (error) {
                            $scope.errorStatus = error;
                        });
                    }
                };

                $scope.closeModal = function () {
                    $timeout(function () {
                        //https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest
                        $('a.close-reveal-modal').trigger('click');
                    }, 0, false);
                };

                //After the login has succeeded, this broadcast success message closes the modal window if its still open
                //This login message is also broadcast when an account is created as well
                $scope.$on('AuthenticateJS.login', function (event, user) {
                    $scope.password = '';
                    $scope.passwordAgain = '';
                    if (user.created === true) {
                        user.created = false;
                        $('#successModal').foundation('reveal', 'open');
                    } else {
                        $('#sign-in-modal').foundation('reveal', 'close');
                    }
                });

                /*Profile Management*/

                //Update Share Visibility (note errorStatus is shared for all of these)
                $scope.updateShareVisibility = function () {
                    //$scope.signUpFormData.storyVisibility will have new values
                    //may also want to update $scope.userInfo.getUser().storyVisibility
                    if (AuthenticateJS.isLoggedIn()) {
                        //this is the method that is called after the form has validated (api url needs to be configured in app.js)
                        AuthenticateJS.updateAccount(
                            $scope.signUpFormData.email,
                            $scope.password,
                            $scope.signUpFormData.firstName,
                            $scope.signUpFormData.lastName,
                            $scope.signUpFormData.displayName,
                            $scope.signUpFormData.storyVisibility, //Public or Curious World community only
                            $scope.signUpFormData.receiveNews // true or false
                        ).then(function () {
                            //if anything needs to happen after update
                        }, function (error) {
                            $scope.errorStatus = error;
                        });
                    }
                };

                $scope.updateProfile = function () {
                    //$scope.signUpFormData.storyVisibility will have new values
                    //may also want to update $scope.userInfo.getUser().storyVisibility
                    if (AuthenticateJS.isLoggedIn()) {
                        //this is the method that is called after the form has validated (api url needs to be configured in app.js)
                        AuthenticateJS.updateAccount(
                            $scope.signUpFormData.email,
                            $scope.password,
                            $scope.signUpFormData.firstName,
                            $scope.signUpFormData.lastName,
                            $scope.signUpFormData.displayName,
                            $scope.signUpFormData.storyVisibility, //Public or Curious World community only
                            $scope.signUpFormData.receiveNews // true or false
                        ).then(function () {
                            //if anything needs to happen after update
                        }, function (error) {
                            $scope.errorStatus = error;
                        });
                    }
                };

                //Update Email
                $scope.updateUserEmail = function () {
                    $scope.signUpFormData.email = $scope.newEmail;

                    AuthenticateJS.updateAccount(
                        $scope.signUpFormData.email,
                        $scope.password,
                        $scope.signUpFormData.firstName,
                        $scope.signUpFormData.lastName,
                        $scope.signUpFormData.displayName,
                        $scope.signUpFormData.storyVisibility, //Public or Curious World community only
                        $scope.signUpFormData.receiveNews // true or false
                    ).then(function () {
                        //if anything needs to happen after update
                    }, function (error) {
                        $scope.errorStatus = error;
                    });
                };

                //Update Password
                $scope.updateUserPassword = function () {
                    //$scope.password will have new values
                    //$scope.oldPassword will have the old password

                    AuthenticateJS.updateAccount(
                        $scope.signUpFormData.email,
                        $scope.password,
                        $scope.signUpFormData.firstName,
                        $scope.signUpFormData.lastName,
                        $scope.signUpFormData.displayName,
                        $scope.signUpFormData.storyVisibility, //Public or Curious World community only
                        $scope.signUpFormData.receiveNews // true or false
                    ).then(function () {
                        //if anything needs to happen after update
                    }, function (error) {
                        $scope.errorStatus = error;
                    });
                };

                //Remove Shared Content
                $scope.removeSharedContent = function () {
                };

                //Reset Cards
                $scope.resetCards = function () {
                };

                //Get Started
                $scope.getStarted = function(){
                  $timeout(function () {
                    $location.path('/');
                      //https://docs.angularjs.org/error/$rootScope/inprog?p0=$digest
                      $('a.close-reveal-modal').trigger('click');
                  }, 0, false);
                };

                //Delete Account
                $scope.deleteFormData = {};
                $scope.deleteAccount = function () {
                    AuthenticateJS.deleteAccount(
                        $scope.signUpFormData.reason,
                        $scope.signUpFormData.otherReason
                    ).then(function () {
                        //probably call AuthenticateJS.logout();
                    }, function (error) {
                    });
                };
            }
        ]).directive('pwCheck', function () {
            return {
                require: 'ngModel',
                link: function (scope, elem, attrs, ctrl) {
                    scope.$watch(attrs.pwCheck, function (passwordAgain) {
                        var isValid = ctrl.$viewValue === passwordAgain || ctrl.$viewValue === undefined;
                        ctrl.$setValidity('pwmatch', isValid);
                    });
                }
            };
        });
}(window.angular, window.jQuery));
