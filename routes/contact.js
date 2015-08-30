'use strict';

var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_U,
        pass: process.env.EMAIL_P
    }
});


module.exports = function(app) {

  app.post('/api/contact', function(req,res, next) {
  		if(!validateEmail(req.body.email))
  			return next(new Error("Email not valid"));

  		if(req.body.text.length <= 0)
  			return next(new Error("Contact body not set"));

      // NB! No need to recreate the transporter object. You can use
      // the same transporter object for all e-mails

      // setup e-mail data with unicode symbols
      var mailOptions = {
          from: 'Ahmed\'s Website <blahblah10898@gmail.com>', // sender address
          to: 'ajafri19@gmail.com', // list of receivers
          subject: req.body.email + ' contacted you', // Subject line
          text: req.body.text
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
            var err = new Error("Not implemented yet.");
            err.status = 500;
            return next(err);
          }else{
              res.status(200).send();
          }
      });
  });

	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

  app.get('/api/contact', function(req, res) {
    	res.status(400).send("Nothing here");
  });

};
