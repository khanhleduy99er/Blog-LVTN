import { Request, Response } from "express";
import { jwtMiddleware } from "./jwt-middleware";

export { apiHandler };

async function apiHandler(req: Request, res: Response) {
  try {
    await jwtMiddleware(req, res);
  } catch (err: any) {
    if (err.status === 401) {
      res.status(err.status).json("Phiên làm việc đã hết hạn.");
    }
    res.status(err.status).json("Lỗi do hệ thống.");
  }
}
