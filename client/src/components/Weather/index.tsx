import React from "react";
import "./weather.css";
import { MdSearch, MdLocationPin } from "react-icons/md";
import { DAYS, MONTHS } from "../../../constant";

const Weather = () => {
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
    <div className="weatherWrapper">
      <div className="searchWrapper">
        <input type={"search"} placeholder="Search by city name" />
        <MdSearch fontSize={26} />
        <MdLocationPin fontSize={24} />
        <span>&#8451;</span>
      </div>
      <div className="timeWrapper">
        <p>
          {DAYS[today]}, {dd} {MONTHS[mm]} {yyyy} | {time}
        </p>
      </div>
    </div>
  );
};

export default Weather;
