import { Router, RouterOptions } from "express";
import { apiHandler } from "../utils/api-handler";

export function routeMiddleware(option?: RouterOptions) {
  const router = Router(option);
  router.use(async (req, res, next) => {
    try {
      await apiHandler(req, res);
      next();
    } catch (error) {
      console.log("error");
    }
  });
  return router;
}
