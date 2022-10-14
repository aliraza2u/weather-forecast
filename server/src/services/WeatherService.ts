import { Inject, Injectable } from "@tsed/di";
import { MongooseModel } from "@tsed/mongoose";
import { WeatherModel } from "../models/WeatherModel";

class CreateWeather {
  longitude: number;
  latitude: number;
  temp: number;
  city: string;
  country: string;
  population: string;
}

class UpdateWeather extends CreateWeather {
  id: string;
}

@Injectable()
export class WeatherService {
  constructor(
    @Inject(WeatherModel) private weatherModel: MongooseModel<WeatherModel>
  ) {}

  public async getWeatherList(): Promise<WeatherModel[]> {
    return await this.weatherModel.find();
  }

  public async getWeatherById(id: string): Promise<WeatherModel | null> {
    return await this.weatherModel.findById(id);
  }

  public async createWeather(data: CreateWeather): Promise<WeatherModel> {
    return await this.weatherModel.create(data);
  }

  public async updateWeather(
    data: UpdateWeather
  ): Promise<WeatherModel | null> {
    return await this.weatherModel.findByIdAndUpdate(data.id, data);
  }

  public async deleteWeather(id: string): Promise<null> {
    return await this.weatherModel.findByIdAndDelete(id);
  }
}
