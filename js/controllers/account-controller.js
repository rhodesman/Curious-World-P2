/*
 To use this library you should have a server application that handles authentication with sessions
 and it should have a login api that uses a username and password parameters,
 a logout url and an api endpoint to get the current loggedin user with its credentials. (Configured in app.js)
 */

(function (ng, $) {
    "use strict";

    ng.module("app")
        .controller("AccountController", [
            'AuthenticateJS',
            "$scope",
            function (AuthenticateJS, $scope) {

                $scope.signUpFormData = {};
                $scope.userInfo = AuthenticateJS;

                //Sign up method
                $scope.signUp = function() {
                    if ($scope.createAccountForm.$valid)
                    {
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
                                $('a.close-reveal-modal').trigger('click');
                                $('#create-account-success-modal').foundation('reveal', 'open');
                            }, function (error) {
                            $scope.errorStatus = error;
                        });
                    }
                };

                //After the login has succeeded, this broadcast success message closes the modal window if its still open
                //This login message is also broadcast when an account is created as well
                $scope.$on('AuthenticateJS.login', function(e) {
                        console.log(e);
                        $scope.password = '';
                        $scope.passwordAgain = '';
                        // $('a.close-reveal-modal').trigger('click');
                });

                /*Profile Management*/

                //Update Share Visibility (note errorStatus is shared for all of these)
                $scope.updateShareVisibility = function(){
                    //$scope.signUpFormData.storyVisibility will have new values
                    //may also want to update $scope.userInfo.getUser().storyVisibility

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
                };

                //Update Email
                $scope.updateUserEmail = function() {
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
                $scope.updateUserPassword = function() {
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

                //Delete Account
                $scope.deleteFormData = {};
                $scope.deleteAccount = function() {
                        AuthenticateJS.deleteAccount(
                            $scope.signUpFormData.reason,
                            $scope.signUpFormData.otherReason
                        ).then(function () {
                            //probably call AuthenticateJS.logout();
                        }, function (error) {
                        });
                };

            }
        ]).directive('createAccountForm', function () {
            return {
                templateUrl: 'partials/modals/signup.html'
            };
        }).directive('manageAccountForm', function () {
            return {
                templateUrl: 'partials/modals/manageaccount.html'
            };
        }).directive('deleteAccountForm', function () {
            return {
                templateUrl: 'partials/modals/deleteaccount.html'
            };
        }).directive('changeEmailForm', function () {
            return {
                templateUrl: 'partials/modals/changeemail.html'
            };
        }).directive('changePasswordForm', function () {
            return {
                templateUrl: 'partials/modals/changepassword.html'
            };
        }).directive('removeContentForm', function () {
            return {
                templateUrl: 'partials/modals/removecontent.html'
            };
        }).directive('resetCardsForm', function () {
            return {
                templateUrl: 'partials/modals/resetcards.html'
            };
        }).directive('createAccountSuccess', function () {
            return {
                templateUrl: 'partials/modals/signupsuccess.html'
            };
        }).directive('pwCheck', function () {
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
