var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    // db.Travel.findAll({}).then(function (dbtravel) {
    res.render("index", {
      msg: "Welcome!",
      title: "Home Page"
    });
    // });
  });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function (req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // var db = require("../models");

  // module.exports = function (app) {
  // Load index page
  app.get("/admin", function (req, res) {

    db.Travel.findAll({}).then(function (dbTravel) {
      res.render("admin", {
        dbTravel
      })
    });
  });

  // res.sendFile(path.join(__dirname, "admin.html"));
  // db.Travel.findAll({}).then(function (dbTravel) {
  //   res.json(dbTravel);


  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

