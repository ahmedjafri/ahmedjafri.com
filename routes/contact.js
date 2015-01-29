'use strict';


module.exports = function(app) {

  app.post('/contact', function(req,res) {
    res.status(500).send("Implement this");
  });

  app.get('/contact', function(req, res) {
    res.status(400).send("Nothing here");
  });

};
