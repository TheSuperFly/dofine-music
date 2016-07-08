"use strict";
angular.module('wp')

  .factory('facebookService', function($q, $window) {
    return {
      _logIn: function() {
        var deferred = $q.defer();

        FB.login(function(response) {
          if (response.authResponse) {
            deferred.resolve(response);
          } else {
            deferred.reject(response);
          }
        }, {
          scope: 'email'
        });

        return deferred.promise;
      },
      _checkFacebookConnection: function() {
        var deferred = $q.defer();

        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            deferred.resolve(response);
          } else {
            deferred.reject(response.status);
          }
        });
        return deferred.promise;
      },
      getUserIDAndToken: function() {
        var deferred = $q.defer();
        var self = this;

        self._checkFacebookConnection()
          .then(function(result) {
            deferred.resolve({
              userID: result.authResponse.userID,
              accessToken: result.authResponse.accessToken
            });
          })
          .catch(function() {
            self._logIn()
              .then(function(result) {
                deferred.resolve({
                  userID: result.authResponse.userID,
                  accessToken: result.authResponse.accessToken
                });
              })
              .catch(function(failure) {
                deferred.reject(failure);
              });
          });

        return deferred.promise;
      },
      bringFacebook: function() {
        (function (d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {
            return;
          }
          js = d.createElement(s);
          js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        $window.fbAsyncInit = function () {
          FB.init({
            appId: '1691368681105898',
            xfbml: true,
            version: 'v2.5'
          });
        };
      }
    }
  });