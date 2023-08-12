import { ObjectId } from "mongodb";

export interface Product {
  _id: ObjectId;
  ten: string;
  numFavorite: number;
  hinhAnh: string;
  ngayTao: Date;
  nguoiTao: string;
  ngayCapNhat: Date;
  nguoiCapNhat: string;
}
