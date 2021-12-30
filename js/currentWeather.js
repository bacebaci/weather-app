$(document).ready(function () {
    $('#submitCity').click(function () {
        getWeather()
    })

    function getWeather() {
        let city = $('#city').val()

        if (city != "") {
            $.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=7116dbb446670794d21881d38136b29b`)
                .then(function (data) {
                    console.log(data)
                    $("#showWeather").html(`

                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-center">
                                <h2 class="m-4">${data.name}, ${data.sys.country}</h2>
                                 <h1 class="pt-5">${data.main.temp} &deg;C</h1>
                                 <img class="img-fluid" src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"> 
                                 <p> ${data.weather[0].main}</p>
                               
                             
                                <div class="d-flex justify-content-around">
                                    <span>Min : ${data.main.temp_min}&deg;C</span>
                                    <span>Max : ${data.main.temp_max}&deg;C </span>
                                </div>
                            </div>
                        
                    
                           <div class="weather-description d-flex justify-content-around">
                            <p>Wind Speed: ${data.wind.speed}m/s</p>
                            <p>Pressure: ${data.main.pressure}hpa</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                           </div>
                           
                       </div>

                        <div>

                        </div>
                    </div>
                    `)
                })

            $("#city").val("")

        } else {
            $("#error").html(`
                <div class="alert" id="errorCity"><a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>City field cannot be empty</div>`)
        }
    }
})



