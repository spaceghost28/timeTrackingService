module.exports = function(app) {

  app.post('/tryme', function(req, res) {
    res.json({
      "message": "yo dawg, this worked"
    });
  });

};
