'use strict';
module.exports = function(app) {
  app.controller('ContactController', function ($scope, $location, $http, $log, $cookies, $timeout) {

      $scope.contact = function() {
        $http({
          url: '/contact',
          method: 'POST',
          headers: {name: $scope.name}
        })
        .success( function() {
          $log.info('Content sent successfully');
        });
      };
  });
};
