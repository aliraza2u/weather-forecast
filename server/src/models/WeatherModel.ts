import { Default, Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class WeatherModel {
  @ObjectID("id")
  _id: string;

  @Property()
  longitude: number;

  @Property()
  latitude: number;

  @Property()
  temp: number;

  @Property()
  city: string;

  @Property()
  country: string;

  @Property()
  population: string;

  @Property()
  @Default(new Date())
  createdAt: Date;

  @Property()
  @Default(new Date())
  updatedAt: Date;
}
