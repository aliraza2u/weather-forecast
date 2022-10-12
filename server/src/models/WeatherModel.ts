import { Default, Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class WeatherModel {
  @Property()
  _id: ObjectID;

  @Property()
  city: string;

  @Property()
  @Default(new Date())
  createdAt: Date;

  @Property()
  @Default(new Date())
  updatedAt: Date;
}
