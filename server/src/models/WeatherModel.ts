import { Default, Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class WeatherModel {
  @ObjectID("id")
  _id: string;

  @Property()
  city: string;

  @Property()
  @Default(new Date())
  createdAt: Date;

  @Property()
  @Default(new Date())
  updatedAt: Date;
}
