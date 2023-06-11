import { ObjectId } from "mongodb";

export interface ReviewUs {
  _id: ObjectId;
  ten: string;
  email: string;
  soDienThoai: string;
  noiDung: string;
  danhGia: number;
  ngayTao: Date;
  nguoiTao: string;
  ngayCapNhat: Date;
  nguoiCapNhat: string;
}
