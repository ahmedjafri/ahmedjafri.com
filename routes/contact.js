'use strict';


module.exports = function(app) {

  app.post('/api/contact', function(req,res, next) {
  		var err = new Error("Not implemented yet.");
  		err.status = 500;
  		return next(err);
  });

  app.get('/api/contact', function(req, res) {
    	res.status(400).send("Nothing here");
  });

};
