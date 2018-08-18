$(document).ready(function () {

  var employee_name = $("#name");
  var origin = $("#origin");
  var destination = $("#destination");
  var startDate = $("#startDate");
  var endDate = $("#endDate");
  var airfare = $("#airfare");
  var hotel = $("#hotel");
  var car = $("#car");
  var $submitBtn = $("#submit");
  var $TravelList = $("#TravelList");
  $(document).on("click", "button.submit", function (event) {
    event.preventDefault();

    handleFormSubmit();
  });

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveTravel: function (travel) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/posttravel",
        data: JSON.stringify(travel)
      });
    },

    getTravels: function () {
      return $.ajax({
        url: "api/gettravel",
        type: "GET"
      });
    },

    deleteTravel: function (id) {
      return $.ajax({
        url: "api/travel/" + id,
        type: "DELETE"
      });
    }
  };

// refreshExamples gets new examples from the db and repopulates the list
//var refreshTravels = function () {
  API.getTravels().then(function (data) {
    var $Travel = data.map(function (travel) {
      var $a = $("<a>")
        .text(travel.text)
        .attr("href", "/travel/" + travel.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": travel.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    //$TravelList.empty();
   // $TravelList.append(travels);
  });
//};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function () {

  var employee_name = $("#name").val().trim();
   var origin = $("#origin").val().trim();
   var destination = $("#destination").val().trim();
   var startDate = $("#startDate").val().trim();
   var endDate = $("#endDate").val().trim();
   var airfare = $("#airfare").val();
   var hotel = $("#hotel").val();
   var car = $("#car").val();

  var travel = {
    employee_name: employee_name,
    startDate: startDate,
    endDate: endDate,
    origin: origin,
    destination: destination,
    airfare: airfare,
    car: car,
    hotel: hotel
  };

  if (!(employee_name && startDate && endDate && origin && destination)) {
    alert("You must enter all required fields");
    return;
  }

  API.saveTravel(travel).then(function () {
    //refreshTravel();
  });

  /*employee_name.val("");
  startDate.val("");
  endDate.val("");
  origin.val("");
  destination.val("");
  airfare.val("");
  car.val("");
  hotel.val("");*/
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTravel(idToDelete).then(function () {
    //refreshTravels();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$TravelList.on("click", ".delete", handleDeleteBtnClick);
});