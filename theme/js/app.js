"use strict";
angular.module('wp', ['ngRoute', 'ngSanitize'])

  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      'http://dofine.dev/**',
      'http://localhost:3000/**'
    ]);

  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: localized.partials + 'home.html',
        controller: 'HomeCtrl'
      })
      .when('/votes', {
        templateUrl: localized.partials + 'poll.html',
        controller: 'PollCtrl'
      })
      .when('/votes/finaliste', {
        redirectTo: '/votes'
      })
      .when('/votes/finaliste/:bandName', {
        templateUrl: localized.partials + 'band.html',
        controller: 'BandCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });