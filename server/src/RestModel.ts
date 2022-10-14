import { ArrayOf, Property, Required } from "@tsed/schema";

class PostionModel {
  @Property() public readonly lon: number;
  @Property() public readonly lat: number;
}

export class IconModel {
  @Property() public readonly id: number;
  @Property() public readonly main: string;
  @Property() public readonly description: string;
  @Property() public readonly icon: string;
}

export class MainModel {
  @Property() public readonly temp: number;
  @Property() public readonly feels_like: number;
  @Property() public readonly temp_min: number;
  @Property() public readonly temp_max: number;
  @Property() public readonly pressure: number;
  @Property() public readonly humidity: number;
}
export class WindModel {
  @Property() public readonly speed: number;
  @Property() public readonly deg: number;
}
export class CloudsModel {
  @Property() public readonly all: number;
}

export class SysModel {
  @Property() public readonly type: number;
  @Property() public readonly id: number;
  @Property() public readonly country: string;
  @Property() public readonly sunrise: number;
  @Property() public readonly sunset: number;
}

export class WeatherResultModel {
  @Property() public readonly coord: PostionModel;
  @ArrayOf(IconModel) public readonly weather: IconModel[];
  @Property() public readonly base: string;
  @Property() public readonly main: MainModel;
  @Property() public readonly visibility: number;
  @Property() public readonly wind: WindModel;
  @Property() public readonly clouds: CloudsModel;
  @Property() public readonly dt: number;
  @Property() public readonly sys: SysModel;
  @Property() public readonly timezone: number;
  @Property() public readonly id: number;
  @Property() public readonly name: string;
  @Property() public readonly cod: number;
}

export class CreateWeatherBody {
  @Required() public readonly longitude: number;
  @Required() public readonly latitude: number;
  @Required() public readonly temp: number;
  @Required() public readonly city: string;
  @Required() public readonly country: string;
  @Required() public readonly population: string;
}

export class UpdateWeatherBody extends CreateWeatherBody {
  @Required() public readonly id: string;
}
