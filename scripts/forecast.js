const searchBar = document.querySelector('.search-bar');

let weather = {
    apiKey: "14bc5975bb148f4421746193265d7dcc",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
        this.fetchWeather(searchBar.value);

        //local storage 
        localStorage.setItem("city", searchBar.value);
        //get item
        let storedCity = localStorage.getItem("city");
            // Save the last searched city to local storage
          localStorage.setItem("lastSearchedCity", searchBar.value);
    },
    reset: function () {
        searchBar.value = ""; // clear the search bar input
        document.querySelector(".city").innerText = ""; // clear the displayed city name
        document.querySelector(".icon").src = ""; // clear the displayed weather icon
        document.querySelector(".description").innerText = ""; // clear the displayed weather description
        document.querySelector(".temp").innerText = ""; // clear the displayed temperature
        document.querySelector(".humidity").innerText = ""; // clear

        document.querySelector(".wind").innerText = ""; // clear the displayed wind speed
},
};

document.querySelector(".search button").addEventListener("click", function () {
weather.search();
weather.reset();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
if (event.code === "Enter") {
weather.search();
weather.reset();
}
});

// Retrieve the last searched city from local storage on page load
let lastSearchedCity = localStorage.getItem("lastSearchedCity");
if (lastSearchedCity) {
    searchBar.value = lastSearchedCity;
    weather.fetchWeather(lastSearchedCity);
} else {
    weather.fetchWeather("Nigeria");
}
