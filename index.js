var form = document.querySelector("form");
var cityInput = document.getElementById("weather-search");
var section = document.getElementById("weather");

form.onsubmit = function (e) {
	e.preventDefault();
	var city = cityInput.value.trim();
	var apiKey = "508e60c837e224615d876c902697bf3f";
	cityInput.value = "";

	if (city !== "") {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
		)
			.then(function (res) {
				return res.json();
			})
			.then(function (weatherData) {
				console.log(weatherData);
				section.innerHTML = "";

				var cityName = document.createElement("h2");
				cityName.textContent =
					weatherData.name + ", " + weatherData.sys.country;
				section.appendChild(cityName);


				var cityImg = document.createElement("img");
				var icon = weatherData.weather[0].icon;
				cityImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
				section.appendChild(cityImg);

				var mapLink = document.createElement("a");
				var latCoord = weatherData.coord.lat;
				var lonCoord = weatherData.coord.lon;
				mapLink.href = `https://www.google.com/maps/search/?api=1&query=${latCoord},${lonCoord}`;
				mapLink.target = "_blank";
				mapLink.textContent = "Click to view map";
				section.appendChild(mapLink);

				var weatherCon = document.createElement("p");
				weatherCon.textContent = weatherData.weather[0].description;
				section.appendChild(weatherCon);

				var current = document.createElement("p");
				current.textContent = "Current: " + weatherData.main.temp + "°" + " F";
				section.appendChild(current);

				var feelsLike = document.createElement("p");
				feelsLike.textContent =
					"Feels like: " + weatherData.main.feels_like + "°" + " F";
				section.appendChild(feelsLike);

				var updated = document.createElement("p");
				var time = new Date(weatherData.dt * 1000);
				var timeString = time.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
				});
				updated.textContent = "Last updated: " + timeString;
				section.appendChild(updated);
			})
			.catch(function (err) {
				section.innerHTML = "";
				var locErr = document.createElement("h2");
				locErr.textContent = "Location not found.";
				section.appendChild(locErr);
				console.error("Error fetching weather data:", err);
			});
	}
};
