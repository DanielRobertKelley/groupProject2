// Get references to page elements


var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function () {

  // Get references to page elements
  //var $exampleText = $("#example-text");
  //var $exampleDescription = $("#example-description");
  //var $submitBtn = $("#submit");
  //var $exampleList = $("#example-list");


  $("#submit").on("click", function () {

    var name = $('#name').val().trim();
    var origin = $("#origin").val().trim();
    var destination = $("#destination").val().trim();
    var startDate = $("#startDate").val().trim();
    var endDate = $("#endDate").val().trim();
    var airfare = $("#airfare").val().trim();
    var car = $("#car").val().trim();
    var hotel = $("#hotel").val().trim();

    console.log(name);
    console.log(origin);
    console.log(destination);
    console.log(startDate);
    console.log(endDate);
    console.log(airfare);
    console.log(car);
    console.log(hotel);

    // The API object contains methods for each kind of request we'll make
    var queryAirfare = "https://api.skypicker.com/flights?flyFrom=" + origin + "&to=" + destination + "&dateFrom=" + startDate + "&dateTo=" + endDate + "&curr=USD&oneforcity=1&partner=picky";
    $.ajax({
      url: queryAirfare,
      type: "GET"
    }).done(function (response) {
      var displayDiv = $("<div>");
      var display = $("<div>");
      display.attr("to_type", response.search_params.to_type);
      display.attr("flyFrom_type", response.search_params.flyFrom_type);
      display.attr("passengers", response.search_params.seats.passengers);
      display.attr("cityTo", response.data.cityTo);
      display.attr("cityFrom", response.data.cityFrom);
      display.attr("price", response.data.price);
      displayDiv.append(display);

      $("#displayDiv").append(displayDiv);
    });
  });
},


  function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
)

document.getElementById("defaultOpen").click();

$('#defaultOpen').on("click", function () {
  $('#mgrTab').hide();
})

$('#mgrTab').on("click", function () {
  $('#defaultOpen').hide();
  $('#mgrTab').show();
})


