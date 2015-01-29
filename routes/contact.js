'use strict';


module.exports = function(app) {

  app.post('/api/contact', function(req,res) {
    res.status(500).send("Implement this");
  });

  app.get('/api/contact', function(req, res) {
    res.status(400).send("Nothing here");
  });

};
