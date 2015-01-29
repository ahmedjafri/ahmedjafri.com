'use strict';

require('angular/angular');
require('angular-route');

var app = angular.module('AhmedJafri', ['ngRoute']);

// Run

app.run(function () {
  var tag = document.createElement('script');
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

// Config

app.config( function ($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/templates/landing.html'
  })
  .when('/contact', {
    templateUrl: 'js/templates/contact.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);

require('./controllers/contact_controller')(app);
