var myApp = angular.module("myApp", ['smartTable.table','ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        .state('start', {
            url: '/',
            templateUrl: 'pages/start.html'
        })
        
        .state('main', {
            templateUrl: 'pages/main.html'
        })
        
        .state('endgame', {
            templateUrl: 'pages/endgame.html'
        })
        
         .state('contactUs', {
            templateUrl: 'pages/contact_us.html'
        })
        
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    
});

