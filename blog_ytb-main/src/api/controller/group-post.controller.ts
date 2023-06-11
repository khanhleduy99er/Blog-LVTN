import { Request, Response } from "express";
import { connectToDatabase } from "../mongodb";

const { db } = connectToDatabase();
const groupPost = db.collection("group-post");

export async function GetGroupPosts(req: Request, res: Response) {
  const _groupPost = await groupPost.find().toArray();
  res.status(200).json(_groupPost);
}
