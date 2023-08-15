import { Router } from "express";
import {
  CreateReviewUs,
  DeleteReviewUs,
  GetReviewUss,
  UpdateReviewUs,
} from "../controller/review-us.controller";
const router = Router();
router.get("/", GetReviewUss);
router.post("/", CreateReviewUs);
router.put("/", UpdateReviewUs);
router.delete("/", DeleteReviewUs);
export default router;
