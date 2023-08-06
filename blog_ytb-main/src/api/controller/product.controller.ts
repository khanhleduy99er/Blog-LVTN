import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { Product } from "../models/product.model";
import { connectToDatabase } from "../mongodb";

const { db } = connectToDatabase();
const product = db.collection<Product>("product");

export async function GetProducts(req: Request, res: Response) {
  let fullUrl = req.protocol + "://" + req.get("host");

  const _product = await product
    .find()
    .sort({ ngayTao: -1 })
    .toArray();
  res.status(200).json(
    _product.map((t) => {
      return { ...t, hinhAnh: `${fullUrl}${t.hinhAnh}` };
    })
  );
}

export async function CreateProduct(req: Request, res: Response) {
  const _product = await product.insertOne({
    ...req.body,
    ngayTao: new Date(),
    nguoiTao: "khanhleduy99",
  });
  if (_product.insertedId) {
    res.status(200).json("Thêm sản phẩm thành công");
  } else {
    res.status(400).json("Thêm sản phẩm không thành công");
  }
}
export async function UpdateProduct(req: Request, res: Response) {
  const productUpdate = await product.updateOne(
    { _id: new ObjectId(req.query.id as string) },
    {
      $set: req.body,
    }
  );
  if (productUpdate.modifiedCount) {
    res.status(200).json("Cập nhật sản phẩm thành công");
  } else {
    res.status(400).json("Cập nhật sản phẩm không thành công");
  }
}
export async function DeleteProduct(req: Request, res: Response) {
  const productDelete = await product.deleteOne({
    _id: new ObjectId(req.query.id as string),
  });
  if (productDelete.deletedCount) {
    res.status(200).json("Xóa sản phẩm thành công");
  } else {
    res.status(400).json("Xóa sản phẩm không thành công");
  }
}
