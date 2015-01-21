var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

var getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/getUserScore', function(req, res){
    var db = req.db;
    db.collection('score').findOne({name: req.query.name}, function(err, result) {
        console.log(err);
        console.log(result);
        res.send(result);
    });
});

router.get('/getQuestion', function(req, res){
    var db = req.db;
    var i = getRandomInt(0,43);
    db.collection('questions').findOne({_id: i}, function(err, result) {
        res.send(result);
    });
});

router.post('/postScore', function(req, res) {
    var db = req.db;
    db.collection('score').update(
        {name: req.body.name.trim().toLowerCase()}, {
            $inc: {
            totalScore: req.body.currentScore
            }
        }, {
            upsert:true,safe:false
        },
        function(err,data){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
        }
    );
});

router.get('/getHighScore', function(req, res) {
    var db = req.db;
    db.collection('score').find({},{limit:10, sort: [['totalScore',-1]]}).toArray(function(err, results){
        res.send(results);
    });
});

router.post('/postContactUs', function(req, res) {
    var x = 0;
    var interv = setInterval(function(){
        x++;
        console.log(x);
    }, 1000);

    var smtpTransport = nodemailer.createTransport("SMTP",{
       service: "Yahoo",  // sets automatically host, port and connection security settings
       auth: {
           user: "*********",//insert the email addrss that you want to use for sending emails
           pass: "*********" //insert password 
       }
    });
    
    smtpTransport.sendMail({  //email options
       from: "First Last <******@yahoo.com>", // sender address. 
       to: "First Last <*****@yahoo.com>", // receiver
       subject: req.body.contact.name +': ' + req.body.contact.email, // subject
       text: req.body.contact.message // body
    }, function(error, response){  //callback
       clearInterval(interv);
       if(error){
           console.log(error);
           res.send(error);
       }else{
           console.log("Message sent: " + response.message);
           res.send('');
       }
    });
});

module.exports = router;