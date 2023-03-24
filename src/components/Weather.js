import React from "react";
import { useState } from "react";
import axios from "axios";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Nocvember",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toDate = () => {
  const currentDate = new Date();
  const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
  return date;
};

const getTime = (stamp) => {
  return new Date(stamp * 1000).toLocaleTimeString();
};

function Weather() {
  const [query, setQuery] = useState();
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });

  const search = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQuery("");
      setWeather({ ...weather, loading: true, data: {} });
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const appid = "450a9d622a56bff861d328ffbea10a4b";

      await axios
        .get(url, {
          params: {
            q: query,
            units: "metric",
            appid: appid,
          },
        })
        .then((res) => {
          console.log("res", res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: {}, error: true });
          setQuery("");
          console.log("error", error);
        });
    }
  };

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={search}
        />
      </div>

      {weather.loading && (
        <>
          <div class="loader">
            <div class="loader-container">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            {/* <FontAwesomeIcon icon={faFrown} /> */}
            <span style={{ "font-size": "20px" }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            <span>{Math.round(weather.data.main.temp)}</span>
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="weather-info">
            <div className="weather-column">
              <div className="data-div">
                <span className="weather-heading">High/Low</span>{" "}
                <span>
                  {Math.round(weather.data.main.temp_max)}/
                  {Math.round(weather.data.main.temp_min)}
                </span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Humidity</span>{" "}
                <span>{weather.data.main.humidity} %</span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Pressure</span>{" "}
                <span>{weather.data.main.pressure} hPa</span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Visibility</span>{" "}
                <span>{weather.data.visibility / 1000} Km</span>
              </div>
            </div>
            <div className="weather-column">
              <div className="data-div">
                <span className="weather-heading">Weather</span>{" "}
                <span>{weather.data.weather[0].description}</span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Wind</span>{" "}
                <span>{weather.data.wind.speed} Km/hr</span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Sunrise</span>{" "}
                <span>{getTime(weather.data.sys.sunrise)}</span>
              </div>
              <div className="data-div">
                <span className="weather-heading">Sunset</span>{" "}
                <span>{getTime(weather.data.sys.sunset)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
