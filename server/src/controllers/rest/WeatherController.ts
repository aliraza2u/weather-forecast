import { Controller, Inject } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { BodyParams, PathParams } from "@tsed/platform-params";
import {
  Delete,
  Get,
  Post,
  Property,
  Put,
  Required,
  Returns,
} from "@tsed/schema";
import axios from "axios";
import { fetchWeather } from "../../client";
import { WeatherModel } from "../../models/WeatherModel";
import { WeatherService } from "../../services/WeatherService";

class WeatherParams {
  @Required() public readonly id: string;
}

class UpdateWeatherBody {
  @Property() public readonly id: string;
  @Property() public readonly data: WeatherModel;
}

@Controller("/weather")
export class WeatherController {
  @Inject()
  private weatherService: WeatherService;

  @Get("/")
  @Returns(200, Object).Of(Object)
  public async getWeatherList() {
    const currentWeather = await fetchWeather({
      longitude: "74.3436",
      latitude: "31.5497",
    });
    if (!currentWeather) throw new NotFound("Weather not found");
    // console.log("current weather---------", currentWeather.data);
    return currentWeather;
    // return await this.weatherService.getWeatherList();
  }

  @Get("/:id")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async getWeatherById(@PathParams() params: WeatherParams) {
    const { id } = params;
    return await this.weatherService.getWeatherById(id);
  }

  @Post("/")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async postWeather(@BodyParams() body: WeatherModel) {
    return await this.weatherService.createWeather(body);
  }

  @Put("/")
  @Returns(200, WeatherModel).Of(WeatherModel)
  public async updateWeather(@BodyParams() body: UpdateWeatherBody) {
    const { id, data } = body;
    return await this.weatherService.updateWeather(id, data);
  }

  @Delete("/:id")
  @Returns(200, String)
  public async deleteWeather(@PathParams() params: WeatherParams) {
    const { id } = params;
    await this.weatherService.deleteWeather(id);
    return "Delete record successfully";
  }
}
