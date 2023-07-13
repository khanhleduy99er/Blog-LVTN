import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { User } from "../models/user.model";
import { connectToDatabase } from "../mongodb";

const connectDb = connectToDatabase();
const user = connectDb.db.collection<User>("user");
export async function Login(req: Request, res: Response) {
  const _user = await user.findOne({
    taiKhoan: req.body.taiKhoan,
    matKhau: req.body.matKhau,
  });
  if (_user) {
    const token = sign(
      { sub: _user.taiKhoan },
      process.env.SECRETCONFIG ?? "",
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json(token);
  } else {
    res.status(400).json("Thông tin đăng nhập không hợp lệ");
  }
}
export async function GetUsers(req: Request, res: Response) {
  const _user = await user.find().toArray();
  res.status(200).json(_user);
}

export async function CreateUser(req: Request, res: Response) {
  const checkUser = await user.findOne({
    taiKhoan: req.body.taiKhoan,
    email: req.body.email,
  });
  if (checkUser) {
    res.status(400).json("Người dùng đã tồn tại");
    return;
  }
  const _user = await user.insertOne({
    ...req.body,
    ngayTao: new Date(),
    nguoiTao: "khanhleduy99er",
  });
  if (_user.insertedId) {
    res.status(200).json("Thêm người dùng thành công");
  } else {
    res.status(400).json("Thêm người dùng không thành công");
  }
}
export async function UpdateUser(req: Request, res: Response) {
  const userUpdate = await user.updateOne(
    { _id: new ObjectId(req.query.id as string) },
    {
      $set: req.body,
    }
  );
  if (userUpdate.modifiedCount) {
    res.status(200).json("Cập nhật người dùng thành công");
  } else {
    res.status(400).json("Cập nhật người dùng không thành công");
  }
}
export async function DeleteUser(req: Request, res: Response) {
  const userDelete = await user.deleteOne({
    _id: new ObjectId(req.query.id as string),
  });
  if (userDelete.deletedCount) {
    res.status(200).json("Xóa người dùng thành công");
  } else {
    res.status(400).json("Xóa người dùng không thành công");
  }
}
