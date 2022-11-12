import { ArrayOf, Property, Required } from "@tsed/schema";

class PostionModel {
  @Property() public readonly lon: number;
  @Property() public readonly lat: number;
}

class IconModel {
  @Property() public readonly id: number;
  @Property() public readonly main: string;
  @Property() public readonly description: string;
  @Property() public readonly icon: string;
}

class MainModel {
  @Property() public readonly temp: number;
  @Property() public readonly feels_like: number;
  @Property() public readonly temp_min: number;
  @Property() public readonly temp_max: number;
  @Property() public readonly pressure: number;
  @Property() public readonly humidity: number;
  @Property() public readonly sea_level: number;
}

class WindModel {
  @Property() public readonly speed: number;
  @Property() public readonly deg: number;
  @Property() public readonly gust: number;
}

class CloudsModel {
  @Property() public readonly all: number;
}

export class WeatherResultModelList {
  @Property() public readonly dt: number;
  @Property() public readonly main: MainModel;
  @ArrayOf(IconModel) public readonly weather: IconModel[];
  @Property() public readonly clouds: CloudsModel;
  @Property() public readonly wind: WindModel;
  @Property() public readonly visibility: number;
  @Property() public readonly dt_txt: string;
}

export class LocationResultModel {
  @Property() public readonly id: number;
  @Property() public readonly name: string;
  @Property() public readonly coord: PostionModel;
  @Property() public readonly country: string;
  @Property() public readonly population: number;
  @Property() public readonly timezone: number;
  @Property() public readonly sunrise: number;
  @Property() public readonly sunset: number;
}

export class WeatherResultModel {
  @Property() public readonly weatherResult: WeatherResultModelList;
  @Property() public readonly locationInfo: LocationResultModel;
}
