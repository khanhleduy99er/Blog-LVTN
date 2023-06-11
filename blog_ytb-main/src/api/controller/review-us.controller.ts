import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { ReviewUs } from "../models/review-us.model";
import { connectToDatabase } from "../mongodb";

const { db } = connectToDatabase();
const review = db.collection<ReviewUs>("review-us");

export async function GetReviewUss(req: Request, res: Response) {
  const _review = await review.find().toArray();
  res.status(200).json(_review);
}

export async function CreateReviewUs(req: Request, res: Response) {
  const _review = await review.insertOne({
    ...req.body,
    ngayTao: new Date(),
    nguoiTao: "khanhleduy99er",
  });
  if (_review.insertedId) {
    res.status(200).json("Thêm đánh giá thành công");
  } else {
    res.status(400).json("Thêm đánh giá không thành công");
  }
}
export async function UpdateReviewUs(req: Request, res: Response) {
  const reviewUpdate = await review.updateOne(
    { _id: new ObjectId(req.query.id as string) },
    {
      $set: req.body,
    }
  );
  if (reviewUpdate.modifiedCount) {
    res.status(200).json("Cập nhật đánh giá thành công");
  } else {
    res.status(400).json("Cập nhật đánh giá không thành công");
  }
}
export async function DeleteReviewUs(req: Request, res: Response) {
  const reviewDelete = await review.deleteOne({
    _id: new ObjectId(req.query.id as string),
  });
  if (reviewDelete.deletedCount) {
    res.status(200).json("Xóa đánh giá thành công");
  } else {
    res.status(400).json("Xóa đánh giá không thành công");
  }
}
