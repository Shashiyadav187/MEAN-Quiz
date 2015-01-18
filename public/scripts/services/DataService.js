
myApp.factory('DataService', function ($http) {
    return {
        getQuestion: function() {
            return $http.get('/getQuestion');
        },
        getUserScore: function(name) {
            return $http.get('/getUserScore', {
                params: {
                    name: name
                }
             }); 
        },
        getHighScore: function() {
            return $http.get('/getHighScore');   
        },
        postScore: function(name, score) {
            return $http.post('/postScore', {
                name: name,
                currentScore: score
            });
        }
    }
});






