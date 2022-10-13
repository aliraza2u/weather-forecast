import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (data: {
  country?: string;
  longitude?: string;
  latitude?: string;
}) => {
  const { country, longitude, latitude } = data;
  try {
    return await axios({
      method: "GET",
      baseURL,
      params: {
        q: country && country,
        lat: latitude && latitude,
        lon: longitude && longitude,
        units: "metric",
        appid: process.env.WEATHER_API_KEY,
      },
    });
  } catch (error) {
    console.log("Error -:", error);
  }
};
