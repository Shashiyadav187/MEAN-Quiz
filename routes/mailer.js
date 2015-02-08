var nodemailer = require('nodemailer');

module.exports = function(myApp) {
    myApp.post('/postContactUs', function(req, res) {
        var x = 0;
        var interv = setInterval(function() {
            x++;
            console.log(x);
        }, 1000);

        var smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Yahoo", // sets automatically host, port and connection security settings
            auth: {
                user: "webnodemailer@yahoo.com", //insert the email addrss that you want to use for sending emails
                pass: "nodejs2015" //insert password 
            }
        });

        smtpTransport.sendMail({ //email options
            from: "First Last <webnodemailer@yahoo.com>", // sender address. 
            to: "First Last <webnodemailer@yahoo.com>", // receiver
            subject: req.body.contact.name + ': ' + req.body.contact.email, // subject
            text: req.body.contact.message // body
        }, function(error, response) { //callback
            clearInterval(interv);
            if (error) {
                console.log(error);
                res.send(error);
            }
            else {
                console.log("Message sent: " + response.message);
                res.send('');
            }
        });
    });
}