import React, { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import NavBar from "./components/NavBar";
import HeroBox from "./components/HeroBox";
import WeatherCard from "./components/WeatherCard";

const DUMMY_CITIES = [
  // {
  //   city: "London",
  //   id: "UK",
  //   country: "United Kingdom",
  // },
];

const api = {
  key: "2c006b98e2ee5b157418ce7c4325967d",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [cities, setCities] = useState(DUMMY_CITIES);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    cities.forEach((city) => {
      const encodedCityName = encodeURIComponent(city.city);
      fetch(
        `${api.base}weather?q=${encodedCityName}&units=metric&appid=${api.key}`
      )
        .then((res) => res.json())
        .then((data) => {
          setWeatherData((prevData) => [
            {
              weatherIcon: data.weather[0].icon,
              cityName: city.city,
              iso: city.id,
              description: data.weather[0].description,
              currentTemp: Math.round(data.main.temp),
              feelsLike: Math.round(data.main.feels_like),
              humidity: Math.round(data.main.humidity),
            },
            ...prevData,
          ]);
        });
    });
  }, [cities]);

  const addCityDataHandler = (cityData) => {
    setCities((prevCities) => {
      return [cityData, ...prevCities];
    });
  };
  return (
    <ChakraProvider>
      <NavBar></NavBar>
      <HeroBox onAddCityData={addCityDataHandler}></HeroBox>
      <div style={{ marginLeft: "120px", marginRight: "120px" }}>
        {weatherData.map((weather, index) => (
          <WeatherCard
            key={index}
            weatherIcon={weather.weatherIcon}
            cityName={weather.cityName}
            iso={weather.iso}
            description={weather.description}
            currentTemp={weather.currentTemp}
            feelsLike={weather.feelsLike}
            humidity={weather.humidity}
          />
        ))}
      </div>
    </ChakraProvider>
  );
}

export default App;
