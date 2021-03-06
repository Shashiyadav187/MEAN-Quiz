myApp.controller('mainController', ['$scope', 'DataService', 'Shuffle', '$timeout', '$interval', '$http','$state', function ($scope, DataService, Shuffle, $timeout, $interval, $http, $state) {
    
    $scope.player = {};
    $scope.numberOfQuestions = 0;
    
    //getScore is used for retrieving a user's total score from all game plays
    $scope.getScore = function() {
        DataService.getUserScore($scope.player.name).then(function(result){
            $scope.totalScore = result.data.totalScore;
        });
    }
    
    //getHighScore retrieves the top X players from the database
    $scope.getHighScore = function() {
        DataService.getHighScore().then(function(result){
            $scope.highScore = result.data;
        });
    }
    
    //postScore sends the user's score to the database at the end of the round
    $scope.postScore = function(name, score) {
        DataService.postScore(name, score).then(function(result){
            $scope.getScore();
        });
        
    }
    
    
    //resets the question (such as question content, answers, colors, timer)
    function resetQuestion() {
        $scope.data = {};
        $scope.elementInfo = {
            answerClass: [" answerBtn btn btn-primary", " answerBtn btn btn-primary", " answerBtn btn btn-primary", " answerBtn btn btn-primary"],
            answerClassNew: [" chunky chunky-primary", " chunky chunky-primary", " chunky chunky-primary", " chunky chunky-primary"]
        };
        $scope.timer = 5;
        $scope.seconds = 5;
        $scope.showTimer = true;

    }
    

    //gets the questions from the database
    function getQuestion() {
        $scope.hideUntilLoaded = true;
        resetQuestion();
        $scope.currentQuestionNo++;
        //HTTP GET question from the DB
        DataService.getQuestion().then(function (result) {
            //result contains the question obj {question, answer and three wrong choices}
            var question = result.data;
            //$scope.data.q holds the question for e.g: "what is the capital of France?"
            $scope.data.q = question.q;
            //we save the correct answer in a variable so we can use it for validating the answer
            correctAnswer = question.a;
            //  we put the the correct answer together with the three wrong ones in an array and we shuffle it
            //  so you the right answer is in a different position every time you get the same question
            $scope.data.answers = Shuffle.randomizeArray([question.a, question.v1, question.v2, question.v3]);
            $scope.hideUntilLoaded = false;
        });
        //this is the countdown timer; it starts when the questions is loaded; it stops when the time runs out or when you pick an answer
        myTimer = $interval(function () {
            if ($scope.timer > 0) {
                $scope.timer--;
            } else {
                $scope.validateAnswer(4);
            }
        }, 1000);
    };
    
    //it validates your answer, makes your choice orange, makes the right one green, makes the wrong one red.
    //the timer is cancelled when this function is called
    $scope.validateAnswer = function (ans) {
        $scope.showTimer = false;
        $interval.cancel(myTimer);
        $scope.elementInfo.answerClass[ans] += " btn-warning";
        $scope.elementInfo.answerClassNew[ans] += " pressed";
        for (var i = 0; i < 4; i++) {
            $scope.elementInfo.answerClass[i] += " disabled";
            $scope.elementInfo.answerClassNew[i] += " chunky-disabled";
        }
        var timer = $timeout(function () {
            for (var i = 0; i < 4; i++) {
                if (ans == i) {
                    if ($scope.data.answers[ans] == correctAnswer) {
                        $scope.elementInfo.answerClass[ans] = " answerBtn btn btn-primary btn-success disabled ";
                        $scope.elementInfo.answerClassNew[ans] = " chunky chunky-success chunky-disabled ";
                        $scope.currentScore += 10;
                    } else {
                        $scope.elementInfo.answerClass[ans] += " btn-danger";
                        $scope.elementInfo.answerClassNew[ans] = "chunky chunky-danger chunky-disabled";
                    }
                } else if ($scope.data.answers[i] == correctAnswer) {
                    $scope.elementInfo.answerClass[i] += " btn-success";
                    $scope.elementInfo.answerClassNew[i] = "chunky chunky-success chunky-disabled";
                }
            }
        }, 1000);
        //checks if there are questions left during the current round; for e.g: question 1 of 5, 2 of 5, etc.
        if ($scope.currentQuestionNo < $scope.numberOfQuestions) {
            var timer2 = $timeout(function () {
                getQuestion();
            }, 2000);
        } else {
            //if no questions left, then the game ends and the current score is sent to the DB
            $timeout(function(){
                $scope.postScore($scope.player.name, $scope.currentScore);
                $state.go('endgame');
                $scope.getHighScore();
            }, 2000);
        }
    };
    
    $scope.setNumberOfQuestions = function(no) {
        $scope.numberOfQuestions = no;   
    }
    
    //this gets fired when you press the START button
    $scope.startGame = function () {
        var myTimer;
        $scope.currentScore = 0;
        $scope.currentQuestionNo = 0;
        getQuestion();
    }
    

} ]);

