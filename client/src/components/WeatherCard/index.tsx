import React, { FC } from "react";
import "./weatherCard.css";
import { DAYS } from "../../../constant";

interface ForecastIProps {
  day: string;
  temp: number;
  icon: string;
  weather: string;
}

const WeatherCard: FC<ForecastIProps> = ({
  day,
  temp,
  icon,
  weather,
}: ForecastIProps) => {
  const d = new Date(day);

  return (
    <div className="cardWrapper">
      <p>{weather}</p>
      <div className="imageWrapper">
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather"
        />
      </div>
      <p>{temp} &#8451;</p>
    </div>
  );
};

export default WeatherCard;
