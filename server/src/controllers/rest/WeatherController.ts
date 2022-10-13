import { Controller, Inject } from "@tsed/di";
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
import { WeatherModel } from "src/models/WeatherModel";
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
  @Returns(200, Array).Of(WeatherModel)
  public async getWeatherList() {
    return await this.weatherService.getWeatherList();
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
