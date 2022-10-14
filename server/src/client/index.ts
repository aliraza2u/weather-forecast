import axios from "axios";

// const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const baseURL = "https://api.openweathermap.org/data/2.5/forecast";

export const fetchWeather = async (data: {
  city?: string;
  longitude?: string;
  latitude?: string;
  cnt?: number;
}) => {
  const { city, longitude, latitude, cnt } = data;
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
        cnt: cnt && cnt,
      },
    });
  } catch (error) {
    console.log("Error -:", error);
  }
};
