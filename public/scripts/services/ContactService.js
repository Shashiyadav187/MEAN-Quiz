myApp.factory('ContactService', function ($http) {
    return {
        postContactUs: function(contact) {
            return $http.post('/postContactUs', {
                contact: contact
            });
        }
    }
});
