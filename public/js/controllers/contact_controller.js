'use strict';
module.exports = function(app) {
  app.controller('ContactController', function ($scope, $location, $http, $log, $timeout) {
    $scope.formSubmitted = false;

    $scope.formData = {
      email: '',
      text: ''
    };

    $scope.processForm = function() {
      $http({
        url: 'api/contact',
        method: 'POST',
        data: $scope.formData,
        headers: { "Content-type": "application/json" }
      })
      .success( function(response) {
        $scope.alertError = false;
      })
      .error(function(response) {
        $scope.alertError = true;
        $scope.errMessage = response.message;
      })
      .finally(function(){
        $scope.formSubmitted = true;
      })
    };

  });
};
