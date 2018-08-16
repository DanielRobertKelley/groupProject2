var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {

      $("#submit").on("click", function (event) {
        event.preventDefault();
        console.log("click");
        var origin = $("#origin").val().trim();
        var destination = $("#destination").val().trim();
        var startDate = $("#startDate").val().trim();
        var endDate = $("#endDate").val().trim();

        console.log(origin);
        console.log(destination);
        console.log(startDate);
        console.log(endDate);

        // The API object contains methods for each kind of request we'll make
        var queryAirfare = "https://api.skypicker.com/flights?flyFrom=" + origin + "&to=" + destination + "&dateFrom=" + startDate + "&dateTo=" + endDate + "&curr=USD&oneforcity=1&partner=picky";
        $.ajax({
          url: queryAirfare,
          type: "GET"
        }).done(function (response) {
          var displayDiv = $("<div>");
          var display = $("<div>");
          console.log(response);
          display.append(" <div>From: " + response.data[0].cityFrom + "</div>");
          display.append(" <div>From: " + response.data[0].cityTo + "</div>");
          display.append(" <div>Price: $" + response.data[0].conversion.USD + "</div>");
          var t = response.data[0].dTimeUTC;
          var dt = moment.unix(t).format('MMMM Do YYYY, h:mm:ss a');
          display.append(" <div>Departure Time: " + dt + "</div>");
          var t2 = response.data[0].aTimeUTC;
          var at = moment.unix(t2).format('MMMM Do YYYY, h:mm:ss a');
          display.append(" <div>Arrival Time: " + at + "</div>");
          display.append(" <div>Flight duration: " + response.data[0].fly_duration + "</div>");
          display.append(" <div>No. of : " + response.data[0].fly_duration + "</div>");
          console.log(dt);

          displayDiv.append(display);
          $("#displayDiv").append(displayDiv);
        });
      });
    });
    res.json(dbExample);
  });


  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {


      res.json(dbExample);
    });
  });
};
