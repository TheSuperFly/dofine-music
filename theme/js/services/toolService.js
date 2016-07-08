"use strict";
angular.module('wp')

  .service('toolService', function($q, $http, facebookService) {
    return {
      doVoteFor: function(band) {
        return $q(function(resolve, reject) {
          facebookService.getUserIDAndToken()
            .then(function (res) {
                $http({
                  method: 'GET',
                  url   : '/api/vote/'
                  + band + '/'
                  + res.userID + '/'
                  + res.accessToken
                })
                .then(function successCallback(response) {
                  console.log('WP Api response');
                  console.log(response);
                  if (response.data.response[0] !== false) {
                    resolve(response.data.response);
                  } else {
                    reject(response.data.response);
                  }
                });
            });
        });
      }
    }
  });