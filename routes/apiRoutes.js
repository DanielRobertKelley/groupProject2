var db = require("../models");

module.exports = function (app) {
  // Get all travel requests
  app.get("/api/gettravel", function (req, res) {
    db.Travel.findAll({}).then(function (dbTravel) {
      res.json(dbTravel);
    });
  });

  // Create a new travel
  app.post("/api/posttravel", function (req, res) {
    db.Travel.create({
      employee_name: req.body.text,
      start_date: req.body.text,
      end_date: req.body.text,
      origin: req.body.text,
      destination: req.body.text,
      airfare: req.body.text,
      hotel: req.body.text,
      car: req.body.text
    }).then(function (dbTravel) {
      res.json(dbTravel);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  // Delete completed travel 
  app.delete("/api/travel/:id", function (req, res) {
    db.Travel.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTravel) {
      res.json(dbTravel);
    });
  });
};