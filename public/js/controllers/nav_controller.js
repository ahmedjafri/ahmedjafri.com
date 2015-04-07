'use strict';

module.exports = function(app) {
	app.service('NavItems',['$rootScope', function($rootScope) {
		var service = {
			items:[
				{name: 'Blog', location:'/blog'},
				{name: 'About Me', location:'/aboutme'},
				{name: 'Contact', location:'/contact'}
			],

			markActive: function(path) {
				for(var i = 0; i < service.items.length; i++)
				{
					if(service.items[i].location.localeCompare(path) == 0) {
						service.items[i].active = true;
					}else {
						service.items[i].active = false;
					}
				}
			}
		}

		return service;
	}]);

	app.controller('NavController', ['$scope','$location','NavItems', function (scope, $location, NavItems) {
		scope.$on('$routeChangeSuccess', function () {
            NavItems.markActive($location.path());
        });

        NavItems.markActive($location.path());
		scope.navItems = NavItems.items;
	 }]);
};