import { Controller, Inject } from "@tsed/di";
import { Get } from "@tsed/schema";
import { WeatherService } from "../../services/WeatherService";

@Controller("/weather")
export class WeatherController {
  @Inject()
  private weatherService: WeatherService;

  @Get("/")
  get() {
    return this.weatherService.getWeatherList();
  }
}
