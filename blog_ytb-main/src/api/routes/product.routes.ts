import { Router } from "express";
import {
  CreateProduct,
  DeleteProduct,
  GetProducts,
  UpdateProduct,
} from "../controller/product.controller";
import { routeMiddleware } from "./route-base";

const router = routeMiddleware();
router.get("/", GetProducts);
router.post("/", CreateProduct);
router.put("/", UpdateProduct);
router.delete("/", DeleteProduct);
export default router;
