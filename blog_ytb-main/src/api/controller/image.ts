import { Request, Response } from "express";
import fs from "fs";
export async function GetImages(req: Request, res: Response) {
  const arr = fs
    .readdirSync("./images", { withFileTypes: true })
    .filter((item) => !item.isDirectory())
    .map((item) => item.name);
  res.status(200).json(arr);
}
