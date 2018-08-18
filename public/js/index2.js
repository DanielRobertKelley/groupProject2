$(document).ready(function () {

    $("#submit").on("click", function (event) {
        event.preventDefault();
        console.log("click");
        var origin = $("#origin").val().trim();
        var destination = $("#destination").val().trim();
        var startDate = $("#startDate").val().trim();
        var endDate = $("#endDate").val().trim();
        var hotelDest;

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
                /*$.ajax({
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

                    $("#displayDiv").append(displayDiv);*/
            });
        });

    })
    //var queryHotel = "https://api.hotwire.com/v1/deal/hotel?dest=" + hotelDest + "&apikey=r84jrvpk9a6bu5hwsbn487zt&limit=1&format=JSON&EndDate=" + endDate + "StartDate=" + startDate;


});
//});