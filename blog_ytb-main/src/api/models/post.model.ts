import { ObjectId } from "mongodb";

export interface Post {
  _id: ObjectId;
  idGroupPost?: number;
  tieuDe: string;
  noiDung: string;
  hinhAnh: string;
  ngayTao: Date;
  nguoiTao: string;
}
