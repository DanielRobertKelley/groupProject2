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
      employee_name: req.body.employee_name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      origin: req.body.origin,
      destination: req.body.destination,
      airfare: req.body.airfare,
      hotel: req.body.hotel,
      car: req.body.car
    }).then(function (dbTravel) {
      res.json(dbTravel);
    })
      .catch(function (err) {
        res.json(err);
      });
  });

  app.put("/api/posttravel", function (req, res) {
    db.Travel.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbTravel) {
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