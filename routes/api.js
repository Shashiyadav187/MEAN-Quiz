var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(myApp) {


    myApp.get('/getUserScore', function(req, res) {
        var db = req.db;
        db.collection('score').findOne({
            name: req.query.name
        }, function(err, result) {
            console.log(err);
            console.log(result);
            res.send(result);
        });
    });

    myApp.get('/getQuestion', function(req, res) {
        var db = req.db;
        var i = getRandomInt(0, 43);
        db.collection('questions').findOne({
            _id: i
        }, function(err, result) {
            res.send(result);
        });
    });

    myApp.post('/postScore', function(req, res) {
        var db = req.db;
        db.collection('score').update({
                name: req.body.name.trim().toLowerCase()
            }, {
                $inc: {
                    totalScore: req.body.currentScore
                }
            }, {
                upsert: true,
                safe: false
            },
            function(err, data) {
                res.send(
                    (err === null) ? {
                        msg: ''
                    } : {
                        msg: err
                    }
                );
            }
        );
    });

    myApp.get('/getHighScore', function(req, res) {
        var db = req.db;
        db.collection('score').find({}, {
            limit: 10,
            sort: [
                ['totalScore', -1]
            ]
        }).toArray(function(err, results) {
            res.send(results);
        });
    });
}