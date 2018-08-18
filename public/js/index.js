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

    //call api
    API.getTravels();

    //and also save to db with user data at the same time
    handleFormSubmit();
  });
  var queryAirfare = "https://api.skypicker.com/flights?flyFrom=" + origin + "&to=" + destination + "&dateFrom=" + startDate + "&dateTo=" + endDate + "&curr=USD&oneforcity=1&partner=picky";

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveTravel: function (travel) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/travel",
        data: JSON.stringify(travel)
      });
    },

    getTravels: function () {
      return $.ajax({
        url: queryAirfare,
        type: "GET"
      }).done(function (response) {
        var displayDiv = $("<div>");
        var display = $("<div>");
        console.log(response);
        display.append(" <div>From: " + response.data[0].cityFrom + "</div>");
        display.append(" <div>To: " + response.data[0].cityTo + "</div>");
        hotelDest = response.data[0].cityTo;
        display.append(" <div>Price: $" + response.data[0].conversion.USD + "</div>");
        var t = response.data[0].dTimeUTC;
        var dt = moment.unix(t).format('MMMM Do YYYY, h:mm:ss a');
        display.append(" <div>Departure Time: " + dt + "</div>");
        var t2 = response.data[0].aTimeUTC;
        var at = moment.unix(t2).format('MMMM Do YYYY, h:mm:ss a');
        display.append(" <div>Arrival Time: " + at + "</div>");
        display.append(" <div>Flight duration: " + response.data[0].fly_duration + "</div>");
        display.append(" <div>*************************************</div>");
        console.log(dt);
        console.log(hotelDest);
        displayDiv.append(display);
        $("#displayDiv").append(displayDiv);

        $.ajax({
          url: "https://api.hotwire.com/v1/deal/hotel?dest=detroit&apikey=r84jrvpk9a6bu5hwsbn487zt&limit=1&format=JSON&EndDate=" + endDate + "StartDate=" + startDate,
          type: "GET"
        }).done(function (response) {
          console.log(hotelDest);
          var displayDiv = $("<div>");
          var display = $("<div>");
          console.log(response);
          display.append(" <div>Check In: " + response.Result.HotelDeal.EndDate + "</div>");
          display.append(" <div>Check Out: " + response.Result.HotelDeal.StartDate + "</div>");
          display.append(" <div>Hotel Location:" + response.Result.HotelDeal.City + "</div>");
          display.append(" <div>Price: $" + response.Result.HotelDeal.Price + "</div>");
          display.append(" <div>Star Rating: " + response.Result.HotelDeal.StarRating + "star Hotel</div>");
          display.append(" <div>*************************************</div>");
          console.log(response.Result.HotelDeal.EndDate);
          console.log(response.Result.HotelDeal.StartDate);
          console.log(response.Result.HotelDeal.City);
          displayDiv.append(display);

          $("#displayDiv").append(displayDiv);
          $.ajax({
            url: "https://api.hotwire.com/v1/search/car?apikey=r84jrvpk9a6bu5hwsbn487zt&dest=detroit&startdate=" + startDate + "&enddate=" + endDate + "&pickuptime=10:00&dropofftime=13:30&format=JSON",
            type: "GET"
          }).done(function (response) {

            var displayDiv = $("<div>");
            var display = $("<div>");
            console.log(response);
            display.append(" <div>price" + response.Result.TotalPrice + "</div>");
            display.append(" <div>endDate" + response.Result.DropoffDay + "</div>");
            display.append(" <div>startDate" + response.Result.PickupDay + "</div>");
            display.append(" <div>destination" + response.Result.PickupAirport + "</div>");

            displayDiv.append(display);

            $("#displayDiv").append(displayDiv);
          });
        });

      })
    },
    deleteTRavel: function (id) {
      return $.ajax({
        url: "api/travel/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshTravels = function () {
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

      $travelList.empty();
      $travelList.append($travel);
    });
  };

  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function () {

    var travel = {
      employee_name: employee_name,
      start_date: startDate,
      end_date: endDate,
      orgin: orgin,
      destination: destination,
      airfare: airfare,
      car: car,
      hotel: hotel
    };

    if (!(employee_name && start_date && end_date && orgin && destination)) {
      alert("You must enter all required fields");
      return;
    }

    API.saveTravel(travel).then(function () {
      refreshTravel();
    });

    employee_name.val("");
    startDate.val("");
    endDate.val("");
    origin.val("");
    destination.val("");
    airfare.val("");
    car.val("");
    hotel.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteTravel(idToDelete).then(function () {
      refreshTravels();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $TravelList.on("click", ".delete", handleDeleteBtnClick);
});