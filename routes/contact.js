'use strict';


module.exports = function(app) {

  app.post('/api/contact', function(req,res, next) {
  		if(!validateEmail(req.body.email))
  			return next(new Error("Email not valid"));

  		if(req.body.text.length <= 0)
  			return next(new Error("Contact body not set"));

  		var err = new Error("Not implemented yet.");
  		err.status = 500;
  		return next(err);
  });

	function validateEmail(email) {
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}

  app.get('/api/contact', function(req, res) {
    	res.status(400).send("Nothing here");
  });

};
