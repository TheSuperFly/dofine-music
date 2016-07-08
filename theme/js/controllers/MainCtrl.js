angular.module('wp')

  .controller('MainCtrl', function ($scope, $http, $routeParams) {
    $rootScope.viewportClass = "main-viewport";
  });