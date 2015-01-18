var myApp = angular.module("myApp", ['ngRoute','smartTable.table']);

myApp.config(function ($routeProvider) {
    $routeProvider
			.when('/', {
			    templateUrl: 'pages/start.html'
			    
			})
			.when('/about', {
			    templateUrl: 'pages/about.html'

			})
            .when('/endgame', {
                templateUrl: 'pages/endgame.html'

            })
			.when('/main', {
			    templateUrl: 'pages/main.html'
			})
    
            .when('/contact', {
                templateUrl: 'pages/contact_us.html',
                controller: 'contactUsController'
            });

});

