"use strict";
angular.module('wp')

  .service('wpApiService', function ($http, $q) {
    return {
      getAllFinalistsSlug: function () {
        return $q(function (resolve, reject) {
          $http.get('/wp-json/finalist/v1/getAllFinalists')
            .then(function (res) {
              resolve(res.data);
            }, function (res) {
              reject(res);
            });
        });
      },
      getAllFinalists: function () {
        return $q(function (resolve, reject) {
          $http.get('/wp-json/wp/v2/finalistes?post_type=finalistes')
            .then(function (res) {
              resolve(res.data);
            }, function (res) {
              reject(res);
            });
        });
      },
      getFinalist: function (name) {
        return $q(function (resolve, reject) {
          $http.get('/wp-json/wp/v2/finalistes?post_type=finalistes&slug=' + name)
            .then(function (res) {
              resolve(res);
            }, function (res) {
              reject(res);
            });
        });
      },
      getContactForm: function () {
        return $q(function (resolve, reject) {
          $http.get('/wp-json/contactform/v1/getform')
            .then(function (res) {
              resolve(res);
            }, function (res) {
              reject(res);
            });
        })
      }
    }
  });