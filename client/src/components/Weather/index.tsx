import React, { ChangeEvent, useEffect, useState } from "react";
import "./weather.css";
import { MdSearch, MdLocationPin } from "react-icons/md";
import { DAYS, MONTHS } from "../../../constant";
import { PositionTypes, WeatherApiTypes } from "../../../types";
import axios from "axios";
import { Circles } from "react-loader-spinner";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiTypes>();
  const [input, setInput] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [location, setLocation] = useState<PositionTypes>({
    latitude: 0,
    longitude: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if ((location.latitude && location.longitude) || filter) {
      getWeatherData();
    }
  }, [filter, location]);

  const getWeatherData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_KEY}/rest/weather?latitude=${location.latitude}&longitude=${location.longitude}&city=${filter}`
      );
      setWeatherData(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
      });
    }
    setInput("");
    setFilter("");
  };

  const handleSearch = () => {
    if (input) {
      setFilter(input);
    }
  };

  const date = new Date();
  const today = date.getDay();
  const dd = date.getDate();
  const mm = date.getMonth();
  const yyyy = date.getFullYear();
  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <div className="main">
      <div className="weatherWrapper">
        <div className="searchWrapper">
          <input
            type={"text"}
            placeholder="Search by city name"
            onChange={handleInput}
            value={input}
          />
          <MdSearch fontSize={26} onClick={handleSearch} />
          <MdLocationPin fontSize={24} onClick={getLocation} />
        </div>
        {loading ? (
          <div className="loading">
            <Circles color="#ffffff" />
          </div>
        ) : (
          <>
            <div className="timeWrapper">
              <p>
                {DAYS[today]}, {dd} {MONTHS[mm]} {yyyy} | {time}
              </p>
            </div>
            <div className="location">
              <h3>
                {weatherData?.name}, {weatherData?.sys.country}
              </h3>
            </div>
            <div className="currentWeather">
              <div className="weatherIcon">
                <img
                  src={` http://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`}
                  alt="weather"
                />
                <p>{weatherData?.weather?.[0].main}</p>
              </div>

              <h2>
                {weatherData?.main.temp || "Loading..."} <span>&#8451;</span>
              </h2>
              <div className="statistics">
                <p>Min Temp: {weatherData?.main.temp_min}</p>
                <p>Max Temp:{weatherData?.main.temp_max}</p>
                <p>Humidity: {weatherData?.main.humidity}%</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
