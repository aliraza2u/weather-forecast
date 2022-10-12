import { Property } from "@tsed/schema";
import { Model, ObjectID } from "@tsed/mongoose";

@Model()
export class UserModel {
  @Property()
  _id: ObjectID;
  @Property()
  city: string;
}
