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
    console.log(req.body);
    
    db.Travel.create({
      employee_name: req.body.body,
      startDate: req.body.body,
      endDate: req.body.body,
      origin: req.body.body,
      destination: req.body.body,
      airfare: req.body.body,
      hotel: req.body.body,
      car: req.body.body
    }).then(function (dbTravel) {
      res.json(dbTravel);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put("/api/posttravel", function(req, res) {
    db.Travel.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbTravel) {
        res.json(dbTravel);
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