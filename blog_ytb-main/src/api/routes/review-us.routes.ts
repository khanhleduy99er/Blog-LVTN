import { Router } from "express";
import {
  CreateReviewUs,
  DeleteReviewUs,
  GetReviewUss,
  UpdateReviewUs,
} from "../controller/review-us.controller";
import { routeMiddleware } from "./route-base";

const router = routeMiddleware();
router.get("/", GetReviewUss);
router.post("/", CreateReviewUs);
router.put("/", UpdateReviewUs);
router.delete("/", DeleteReviewUs);
export default router;
