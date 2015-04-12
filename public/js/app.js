'use strict';

require('angular/angular');
require('angular-route');
require('./angular-soundcloud-player');

var app = angular.module('AhmedJafri', ['ngRoute','angular-soundcloud-player']);

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

app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'js/templates/landing.html'
  })
  .when('/contact', {
    templateUrl: 'js/templates/contact.html'
  })
  .when('/aboutme', {
    templateUrl: 'js/templates/aboutme.html'
  })
  .when('/blog', {
    templateUrl: 'js/templates/blog.html'
  })
  .otherwise({
    templateUrl: 'js/templates/404.html'
  });

  // use the HTML5 History API
  $locationProvider.html5Mode(true);
}]);

require('./controllers/contact_controller')(app);
require('./controllers/nav_controller')(app);