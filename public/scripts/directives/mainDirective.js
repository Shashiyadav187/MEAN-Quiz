myApp.directive('mainDirective', ['$interval', '$timeout', 'DataService', 'Shuffle', function ($interval, DataService, Shuffle) {
    return {
        restrict: 'EA',
        templateUrl: 'pages/mainDirective.html',
        link: function (scope, element, attrib) {
           
        }
    }
} ]);