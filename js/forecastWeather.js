$(document).ready(function () {
    $("#submitForecast").click(function () {
        populateForecastTable();
    });

    function populateForecastTable() {
        let city = $("#city").val()
        let days = $("#days").val()

        if (city == "" && days == "") {
            $("#error").html(`
                <div class="alert" id="errorCity"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>City and number fields cannot be empty</div>`)
            return;
        }

        if (city == "") {
            $("#error").html(`
                <div class="alert" id="errorCity"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>City field cannot be empty</div>`)
            return;
        }

        if (days == "" || days < 1 || days > 5) {
            $("#error").html(`
                <div class="alert" id="errorCity"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>Write a number between 1 and 5</div>`)
            return;
        }


        if (city != "" && days != "") {
            // get longitude and latitude for the selected city
            $.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}}&limit=1&appid=7116dbb446670794d21881d38136b29b`)
                .then(function (data) {
                    let lat = data[0]['lat'];
                    let lon = data[0]['lon'];

                    // get weather data for the selected city
                    $.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7116dbb446670794d21881d38136b29b&units=metric`)
                        .then(function (data) {
                            $("#forecastHeader").html(`<h2>Weather forecast for ${city}</h2>`)
                            // clear all tds in the forecast table
                            $("#forecastWeather").html("")
                            //  clear input for city and days
                            $("#city").val("")
                            $("#days").val("")
                            // add new rows into the table
                            for (let i = 1; i <= days; i++) {
                                $("#forecastWeather").append(`<tr>
                   		        <td><img src='http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png'></td>
                   		        <td>${data.daily[i].weather[0].main}</td>
                                <td>${data.daily[i].weather[0].description}</td>
                               <td>${data.daily[i].temp.morn}&deg;C</td>
                               <td>${data.daily[i].temp.night}&deg;C</td>
                              <td>${data.daily[i].temp.min}&deg;C</td>
                              <td>${data.daily[i].temp.max}&deg;C</td>
                             <td>${data.daily[i].pressure}hpa</td>
                              <td>${data.daily[i].humidity}%</td>
                              <td>${data.daily[i].wind_speed}m/s</td>
                           </tr>`);
                            }
                        });
                });
        }
    }
})
