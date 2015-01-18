myApp.controller('contactUsController',['$scope', 'ContactService', function($scope, ContactService) {
    $scope.contact = {};
    $scope.visual = {};
    
    $scope.contactUs = function(contact) {
        $scope.visual.showSpinner = true;
        ContactService.postContactUs(contact).then(function(result){
            $scope.visual.showSpinner = false;
            $scope.visual.showMessageSent = true;
            $scope.contact = {};
        });
    };
}]);