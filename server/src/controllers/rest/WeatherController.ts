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
import {
  CreateWeatherBody,
  UpdateWeatherBody,
  WeatherResultModel,
} from "../../RestModel";
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

@Controller("/weather")
export class WeatherController {
  @Inject()
  private weatherService: WeatherService;

  @Get("/open")
  @Returns(200, WeatherResultModel).Of(WeatherResultModel)
  public async getOpenWeather(@QueryParams() query: WeatherQueryParams) {
    const currentWeather = await fetchWeather(query);
    if (!currentWeather) throw new NotFound("Weather not found");
    const { coord, main, sys, name } = currentWeather.data;
    const data = {
      longitude: coord.lon,
      latitude: coord.lat,
      temp: main.temp,
      city: name,
      country: sys.country,
    };
    await this.weatherService.createWeather(data);
    return currentWeather;
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
