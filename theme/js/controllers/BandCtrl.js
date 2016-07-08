"use strict";

angular.module('wp')

  .controller('BandCtrl', function (
    $scope, $rootScope, $routeParams, $location, $sce, $document, $window,
    wpApiService, toolService, facebookService) {

    $rootScope.viewportClass = "band-viewport";

    facebookService.bringFacebook();

    wpApiService.getAllFinalistsSlug()
      .then(function (res) {
        if (res.indexOf($routeParams.bandName) === -1) {
          $location.path('/');
        } else {
          wpApiService.getFinalist($routeParams.bandName)
            .then(function (data) {
              var acfData = data.data[0].acf;

              $rootScope.ogName = data.data[0].title.rendered;
              $rootScope.ogImage = acfData.bandImage.url;

              $scope.soundcloudPlayer = $sce.trustAsHtml(acfData.featuredSoundcloud);
              $scope.videoTag = $sce.trustAsHtml(acfData.video);
              $scope.itwTag = $sce.trustAsHtml(acfData.itw);

              $document.on('scroll', function() {
                if ($window.scrollY > 0) {
                  $scope.$apply(function() {
                    $scope.hasScrolled = true;
                  });
                } else {
                  $scope.$apply(function() {
                    $scope.hasScrolled = false;
                  });
                }
              });

              $scope.finalistNames = acfData.nom_des_finalistes.split(',');
              $scope.finalistID = data.data[0].id;
              $scope.finalist = acfData;
              $scope.finalistBandName = data.data[0].title.rendered;
              $scope.finalistBiography = acfData.biographie
                .split('<!--more-->');
            })
        }
      })
  });