import React, { ChangeEvent, useEffect, useState } from "react";
import "./weather.css";
import { MdSearch, MdLocationPin } from "react-icons/md";
import { DAYS, MONTHS } from "../../../constant";
import {
  ForecastListType,
  PositionTypes,
  WeatherApiTypes,
} from "../../../types";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import WeatherCard from "../WeatherCard";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiTypes | any>();
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
        `http://localhost:4000/rest/weather/forecast?latitude=${
          location.latitude
        }&longitude=${location.longitude}&city=${filter}&cnt=${5}`
      );
      setWeatherData(data);
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value.toLocaleLowerCase());
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
  console.log(weatherData && weatherData.list);

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
                {weatherData?.city?.name}, {weatherData?.city?.country}
              </h3>
            </div>
            <div className="currentWeather">
              <div className="weatherIcon">
                <img
                  src={`http://openweathermap.org/img/wn/${weatherData?.list[0]?.weather?.[0].icon}@2x.png`}
                  alt="weather"
                />
                <p>{weatherData?.list[0]?.weather?.[0].main}</p>
              </div>

              <h2>
                {weatherData?.list[0]?.main.temp || "Loading..."}{" "}
                <span>&#8451;</span>
              </h2>
              <div className="statistics">
                <p>Min Temp: {weatherData?.list[0]?.main.temp_min}</p>
                <p>Max Temp:{weatherData?.list[0]?.main.temp_max}</p>
                <p>Humidity: {weatherData?.list[0]?.main.humidity}%</p>
              </div>
            </div>
            <div>
              <p className="dailyforecast">Forecaset</p>
              <div className="weatherCardWrapper">
                {weatherData?.list?.map((x: ForecastListType) => (
                  <WeatherCard
                    key={x.dt_txt}
                    day={x.dt_txt}
                    icon={x.weather[0].icon}
                    temp={x.main.temp}
                    weather={x.weather[0].main}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;
