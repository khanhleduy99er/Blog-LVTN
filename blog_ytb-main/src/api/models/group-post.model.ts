import { ObjectId } from "mongodb";

export interface GroupPost {
  _id: ObjectId;
  ma: number;
  ten: string;
}
