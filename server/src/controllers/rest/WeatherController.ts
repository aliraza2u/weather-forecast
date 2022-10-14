import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import {
  Delete,
  Get,
  Post,
  Property,
  Put,
  Required,
  Returns,
} from "@tsed/schema";
import { CreateWeatherBody, UpdateWeatherBody } from "../../RestModel";
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

@Controller("/weather")
export class WeatherController {
  @Inject()
  private weatherService: WeatherService;

  @Get("/forecast")
  @Returns(200, Object).Of(Object)
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
    await this.weatherService.createWeather(data);
    return currentWeather.data;
  }

  @Get("/")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async getWeatherList() {
    return this.weatherService.getWeatherList();
  }

  @Get("/:id")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async getWeatherById(@PathParams() params: WeatherParams) {
    const { id } = params;
    return await this.weatherService.getWeatherById(id);
  }

  @Post("/")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async postWeather(@BodyParams() body: CreateWeatherBody) {
    return await this.weatherService.createWeather(body);
  }

  @Put("/")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async updateWeather(@BodyParams() body: UpdateWeatherBody) {
    return await this.weatherService.updateWeather(body);
  }

  @Delete("/:id")
  @Returns(200, String)
  public async deleteWeather(@PathParams() params: WeatherParams) {
    const { id } = params;
    await this.weatherService.deleteWeather(id);
    return "Delete record successfully";
  }
}
