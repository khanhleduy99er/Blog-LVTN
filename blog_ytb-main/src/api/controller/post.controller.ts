import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Post } from "../models/post.model";
import { connectToDatabase } from "../mongodb";

const { db } = connectToDatabase();
const post = db.collection<Post>("post");

// post config
export async function GetPosts(req: Request, res: Response) {
  let fullUrl = req.protocol + "://" + req.get("host");
  const _post = (
    await post
      .find(
        !req.query.idGroup || Number(req.query.idGroup) == 0
          ? {}
          : { idGroupPost: Number(req.query.idGroup) }
      )
      .sort({ ngayTao: -1 })
      .toArray()
  ).map((t) => {
    return { ...t, hinhAnh: `${fullUrl}${t.hinhAnh}` };
  });
  res.status(200).json(_post);
}

// add post
export async function CreatePost(req: Request, res: Response) {
  const _post = await post.insertOne({
    ...req.body,
    ngayTao: new Date(),
    nguoiTao: "khanhleduy99er",
  });
  if (_post.insertedId) {
    res.status(200).json("Thêm bài đăng thành công");
  } else {
    res.status(400).json("Thêm sản phẩm không thành công");
  }
}

// update post
export async function UpdatePost(req: Request, res: Response) {
  const productUpdate = await post.updateOne(
    { _id: new ObjectId(req.query.id as string) },
    {
      $set: req.body,
    }
  );
  if (productUpdate.modifiedCount) {
    res.status(200).json("Cập nhật bài đăng thành công");
  } else {
    res.status(400).json("Cập nhật bài đăng không thành công");
  }
}

// delete post
export async function DeletePost(req: Request, res: Response) {
  const productDelete = await post.deleteOne({
    _id: new ObjectId(req.query.id as string),
  });
  if (productDelete.deletedCount) {
    res.status(200).json("Xóa bài đăng thành công");
  } else {
    res.status(400).json("Xóa bài đăng không thành công");
  }
}
