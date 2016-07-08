"use strict";
angular.module('wp')

  .controller('PollCtrl', function ($rootScope, $scope, $http, $timeout, facebookService, toolService, wpApiService) {
    $rootScope.viewportClass = "poll-viewport";

    wpApiService.getAllFinalists()
      .then(function (data) {
        $rootScope.ogName = "";

        facebookService.bringFacebook();

        $scope.voteFor = function (band) {
          toolService.doVowteFor(band);
        };

        $scope.bands = data;
      });
  });