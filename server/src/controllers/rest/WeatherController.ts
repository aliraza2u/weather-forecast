import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { Delete, Get, Post, Property, Put, Required, Returns } from "@tsed/schema";
import { WeatherResultModel } from "../../RestModel";
import { fetchWeather } from "../../client";
import { WeatherModel } from "../../models/WeatherModel";
import { WeatherService } from "../../services/WeatherService";

class WeatherParams {
  @Required() public readonly id: string;
}

class WeatherQueryParams {
  @Property() public readonly city: string;
  @Property() public readonly longitude: string;
  @Property() public readonly latitude: string;
}

class ForecastQueryParams {
  @Property() public readonly city: string;
  @Property() public readonly longitude: string;
  @Property() public readonly latitude: string;
  @Property() public readonly cnt: number;
}

const days = [0, 1, 2, 3, 4];

@Controller("/weather")
export class WeatherController {
  @Inject()
  private weatherService: WeatherService;

  @Get()
  @Returns(200, WeatherResultModel).Of(WeatherResultModel)
  public async getForecast(@QueryParams() query: ForecastQueryParams) {
    const currentWeather = await fetchWeather(query);
    if (!currentWeather) throw new NotFound("Weather not found");
    const { city, list } = currentWeather.data;
    const data = {
      longitude: city.coord.lon,
      latitude: city.coord.lat,
      temp: list[0].main.temp,
      city: city.name,
      country: city.country,
      population: city.population,
    };
    let weatherResult: any = [];
    for (const day of days) {
      let currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + day);
      const dailyWeather = list.find(
        (x: any) => new Date(x.dt_txt).getDate() === new Date(currentDate).getDate()
      );
      weatherResult.push(dailyWeather);
    }
    const locationInfo = {
      id: city.id,
      name: city.name,
      coord: {
        lat: city.coord.lat,
        lon: city.coord.lon,
      },
      country: city.country,
      population: city.population,
      timezone: city.timezone,
      sunrise: city.sunrise,
      sunset: city.sunset,
    };
    const result = { weatherResult, locationInfo };
    await this.weatherService.createWeather(data);
    return result;
  }

  @Get("/all")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async getWeatherList() {
    return this.weatherService.getWeatherList();
  }
}
