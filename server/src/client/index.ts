import axios from "axios";

const baseURL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (data: {
  city?: string;
  longitude?: string;
  latitude?: string;
}) => {
  const { city, longitude, latitude } = data;
  try {
    return await axios({
      method: "GET",
      baseURL,
      params: {
        q: city && city,
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
